import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { config } from "@skance/config/config.ts";
import { Datastore } from "@skance/datastores/datastore.d.ts";
import { Tenant, TenantAdmin } from "@skance/core/tenant/tenantSchema.ts";
import { ConflictError } from "@skance/utilities/errors.ts";

type LowSchema = {
  tenants: Record<string, Tenant>;
  [key: `${string}:tenantAdmins`]: TenantAdmin[];
}

export class LowDBStore implements Datastore {
  private db: Low<LowSchema>;

  constructor() {
    const defaultData: LowSchema = { tenants: {} };
    this.db = new Low<LowSchema>(new JSONFile<LowSchema>(config.dbLowDbPath), defaultData);
  }

  async createTenant(tenant: Tenant): Promise<Tenant> {
    await this.db.read();

    if (this.db.data.tenants[tenant.id]) {
      throw new ConflictError(`Tenant with shortId ${tenant.id} already exists`);
    }
  
    this.db.data.tenants[tenant.id] = tenant;

    await this.db.write();
    return tenant;
  }

  async readTenants(): Promise<Record<string, Tenant>> {
    await this.db.read();
    return this.db.data.tenants;
  }

  async readTenant(skID: string): Promise<Tenant | undefined> {
    await this.db.read();
    return this.db.data.tenants[skID];
  }

  async createTenantAdmin(tenantId: string, tenantAdmin: TenantAdmin): Promise<TenantAdmin> {
    await this.db.read();
    
    this.db.data[`${tenantId}:tenantAdmins`] = [tenantAdmin];
    
    await this.db.write();
    return tenantAdmin;
  }
}
