import { TenantPermission, TenantRole } from "@skance/components/tenant/tenant.d.ts";

export const defaultTenantPermissions: { [key: string]: TenantPermission } = {
  "tenant:read": {
    key: "tenant:read",
    name: "Tenant Read", 
    description: "Allows the user to read tenants",
    path: "/admin/tenants/:id",
    methods: ["GET"]
  },
  "tenant:write": {
    key: "tenant:write",
    name: "Tenant Write",
    description: "Allows the user to create, update, and delete tenants",
    path: "/admin/tenants/:id",
    methods: ["POST", "PUT", "DELETE"]
  }
};

export const defaultTenantRoles: { [key: string]: TenantRole } = {
  admin: {
    name: "admin",
    description: "Administrator role for the tenant",
    permissions: [
      "tenant:read",
      "tenant:write"
    ]
  }
};