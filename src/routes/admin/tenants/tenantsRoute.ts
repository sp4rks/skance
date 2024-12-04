import { Context } from '@hono/hono';
import { z, OpenAPIHono, createRoute } from '@hono/zod-openapi';

import { TenantSchema, TenantAdminSchema } from "@skance/core/tenant/tenantSchema.ts";
import { createTenant, readTenant, readTenants } from "@skance/core/tenant/tenantController.ts";

export const tenantsRoute = new OpenAPIHono();

// Define input/output schemas
const tenantInput = z.object({
  tenant: TenantSchema.pick({
    name: true,
    description: true
  }),
  tenantAdmin: TenantAdminSchema.pick({
    username: true,
    email: true
  })
});

const tenantOutput = TenantSchema.pick({
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  description: true,
  //tenantAdmins: true
});

const tenantsOutput = z.record(
  z.string().openapi({
    description: "Tenant ID",
    example: "aAbBcC"
  }),
  tenantOutput
);

// Define routes
export const getTenantsRoute = createRoute({
  summary: 'List all tenants',
  tags: ['tenants'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: tenantsOutput
        }
      },
      description: 'A list of all tenants'
    }
  }
});

tenantsRoute.openapi(getTenantsRoute, async (c: Context) => {
  const tenants = await readTenants();
  const validatedTenants = z.record(tenantOutput).parse(tenants);
  return c.json(validatedTenants);
});

export const createTenantRoute = createRoute({
  summary: 'Create a new tenant',
  tags: ['tenants'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: tenantInput
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.record(tenantOutput)
        }
      },
      description: 'The newly created tenant'
    }
  }
});

// @ts-ignore requires import of TypedResponse, which isn't exported and isn't suggested in the docs
tenantsRoute.openapi(createTenantRoute, async (c) => {
    const body = tenantInput.parse(await c.req.json());

  try {
    const newTenant = await createTenant(
      body.tenant.name,
      body.tenantAdmin.username,
      body.tenantAdmin.email,
      body.tenant.description
    );
    const validatedTenant = tenantOutput.parse(newTenant);
    return c.json(validatedTenant);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});

export const getTenantRoute = createRoute({
  summary: 'Get a specific tenant',
  tags: ['tenants'],
  method: 'get',
  path: '/:id',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: tenantOutput
        }
      },
      description: 'The requested tenant'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Tenant not found'
    }
  }
});

// @ts-ignore requires import of TypedResponse, which isn't exported and isn't suggested in the docs
tenantsRoute.openapi(getTenantRoute, async (c) => {
  const id = c.req.param('id');
  const tenant = await readTenant(id);
  
  if (!tenant) {
    return c.json({ error: 'Tenant not found' }, 404);
  }

  const validatedTenant = tenantOutput.parse(tenant);
  return c.json(validatedTenant);
});

