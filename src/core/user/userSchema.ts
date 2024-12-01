import { z } from '@hono/zod-openapi';

export const UserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  username: z.string().min(3).max(64),
  email: z.string().email().optional(),
  password: z.string().optional(),
  verified: z.boolean()
});
export type User = z.infer<typeof UserSchema>;