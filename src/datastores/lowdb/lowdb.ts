import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { config } from "@skance/config/config.ts";
import { Datastore } from "@skance/datastores/datastore.d.ts";
import { Tenant } from "@skance/components/tenant/tenant.d.ts";
import { App } from "@skance/components/app/app.d.ts";
import { ConflictError } from "@skance/utilities/errors.ts";

type Schema = {
  tenants: Record<string, Tenant>;
}

export class LowDBStore implements Datastore {
  private db: Low<Schema>;

  constructor() {
    const defaultData: Schema = { tenants: {} };
    this.db = new Low<Schema>(new JSONFile<Schema>(config.dbLowDbPath), defaultData);
  }

  async createTenant(tenant: Tenant): Promise<Tenant> {
    await this.db.read();

    if (this.db.data.tenants[tenant.id]) {
      throw new ConflictError(`Tenant with shortId ${tenant.id} already exists`);
    }

    tenant.apps = tenant.apps || [];
    
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

  async createApp(tenantId: string, app: App): Promise<App> {
    await this.db.read();
    
    const tenant = this.db.data.tenants[tenantId];
    if (!tenant) {
      throw new Error(`Tenant ${tenantId} not found`);
    }

    tenant.apps.push(app);
    
    await this.db.write();
    return app;
  }
}
