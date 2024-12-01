import { z } from '@hono/zod-openapi';

import { UserSchema } from "@skance/core/user/userSchema.ts";

export const TenantAdminSchema = UserSchema.extend({
  email: z.string().email() // override the optional email from UserSchema
});
export type TenantAdmin = z.infer<typeof TenantAdminSchema>;

export const TenantSchema = z.object({
  id: z.string().length(6), // 6 character shortId
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(3).max(64),
  description: z.string().min(0).max(1024).optional(),
  tenantAdmins: z.array(TenantAdminSchema).max(100)
});
export type Tenant = z.infer<typeof TenantSchema>;