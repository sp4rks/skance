import { App } from "@skance/components/app/app.d.ts";

export interface Tenant {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;

  apps: { [key: string]: App };
  
  tenantPermissions: { [key: string]: TenantPermission };
  tenantRoles: { [key: string]: TenantRole };
  tenantAdmins: TenantAdmin[];
}

export interface TenantPermission {
  key: string;
  name: string;
  description: string;

  path: string;
  methods: string[];
}

export interface TenantRole {
  name: string;
  description: string;

  permissions: string[];
}

export interface TenantAdmin {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  username: string;
  email: string;
  roles: { [key: string]: TenantRole };
}
