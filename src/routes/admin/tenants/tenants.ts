import { Hono } from "jsr:@hono/hono";

import { z } from "zod";

import { Tenant } from "@skance/components/tenant/tenant.d.ts";
import { createTenant, readTenant, readTenants } from "@skance/components/tenant/tenantController.ts";
import type { JWK } from "jose";

const tenants = new Hono();

const tenantInput = z.object({
  name: z.string()
    .min(1)
    .max(64)
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Name can only contain letters, numbers, spaces, hyphens and underscores')
});

const tenantOutput = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
})

/**
 * Returns all tenants.
 * @returns All tenants.
 */
tenants.get("/", async (c) => {
  const tenants = await readTenants();
  //const validatedTenants = Object.values(tenants).map(tenant => tenantOutput.parse(tenant));
  return c.json(tenants);
});

/**
 * Creates a new tenant.
 * @returns The created tenant.
 */
tenants.post("/", async (c) => {
  const parsedBody = await tenantInput.parseAsync(await c.req.json());

  try {
    const newTenant = await createTenant(parsedBody.name);
    const validatedTenant = tenantOutput.parse(newTenant);
    return c.json(validatedTenant, 201);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});

/**
 * Returns a tenant by its tenantId.
 * @returns The tenant.
 */
tenants.get("/:id", async (c) => {
  const id = c.req.param('id');
  const tenant = await readTenant(id);
  
  if (!tenant) {
    return c.json({ error: 'Tenant not found' }, 404);
  }

  const validatedTenant = tenantOutput.parse(tenant);
  return c.json(validatedTenant);
});

export { tenants };