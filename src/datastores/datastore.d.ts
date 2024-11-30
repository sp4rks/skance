import { Tenant } from "@skance/components/tenant/tenant.d.ts";
import { App } from "@skance/components/app/app.d.ts";

export interface Datastore {
  createTenant(tenant: Tenant): Promise<Tenant>;
  readTenants(): Promise<Record<string, Tenant>>;
  readTenant(skID: string): Promise<Tenant | undefined>;
  createApp(tenantId: string, app: App): Promise<App>;
}
