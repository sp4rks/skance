import { Tenant, TenantAdmin } from "@skance/core/tenant/tenantSchema.ts";

export interface Datastore {
  createTenant(tenant: Tenant): Promise<Tenant>;
  readTenants(): Promise<Record<string, Tenant>>;
  readTenant(skID: string): Promise<Tenant | undefined>;
  createTenantAdmin(tenantId: string, tenantAdmin: TenantAdmin): Promise<TenantAdmin>;
}
