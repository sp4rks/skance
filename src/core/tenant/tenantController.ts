import { db } from "@skance/datastores/connect.ts";
import { appLog } from "@skance/middleware/logging.ts";
import { shortId } from "@skance/utilities/shortId.ts";
import { Tenant, TenantAdmin } from "@skance/core/tenant/tenantSchema.ts";
import { InternalServerError } from "@skance/utilities/errors.ts";

export async function createTenant(
  tenantName: string,
  tenantAdminUsername: string,
  tenantAdminEmail: string,
  tenantDescription?: string
) {
  const now = new Date();
  const tenantId = shortId();

  const tenantAdmin: TenantAdmin = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    username: tenantAdminUsername,
    email: tenantAdminEmail,
    verified: false
  }

  const tenant: Tenant = {
    id: tenantId,
    createdAt: now,
    updatedAt: now,
    name: tenantName,
    description: tenantDescription || "",
    tenantAdmins: [tenantAdmin]
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
