import { db } from "@skance/datastores/connect.ts";
import { appLog } from "@skance/middleware/logging.ts";
import { shortId } from "@skance/utilities/shortId.ts";
import { Tenant } from "@skance/components/tenant/tenant.d.ts";
import { InternalServerError } from "@skance/utilities/errors.ts";
import { defaultTenantPermissions, defaultTenantRoles } from "@skance/components/tenant/tenantAuthorization.ts";

export async function createTenant(name: string, description?: string) {
  const now = new Date();
  const tenantId = shortId();

  const tenant: Tenant = {
    id: tenantId,
    name,
    description: description || "",
    createdAt: now,
    updatedAt: now,
    
    apps: {},

    tenantPermissions: defaultTenantPermissions,
    tenantRoles: defaultTenantRoles,
    tenantAdmins: []
    
  }

  // Create the tenant in the database
  try {
    await db!.createTenant(tenant);
    appLog.info(`Created tenant ${tenant.id}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stackTrace = error instanceof Error ? error.stack : 'No stack trace available';
    appLog.error(`Error creating tenant: ${errorMessage}\r\nStack trace: ${stackTrace}`);
    throw new InternalServerError(`Error creating tenant: ${errorMessage}`);
  }

  return await db!.readTenant(tenantId);
}

export async function readTenants() {
  return await db!.readTenants();
}

export async function readTenant(tenantId: string) {
  return await db!.readTenant(tenantId);
}
