import { Hono } from "jsr:@hono/hono";

import { config } from "@skance/config/config.ts";
import { httpLog } from '@skance/middleware/logging.ts';
import { tenants } from '@skance/routes/admin/tenants/tenants.ts';
import { root as adminRoot } from '@skance/routes/admin/index.ts';
//import { root as authRoot } from '@skance/routes/auth/index.ts';
//import { wellKnown } from '@skance/routes/auth/.well_known/wellKnown.ts';
//import { token } from '@skance/routes/auth/token/token.ts';

export const VERSION = 'v1';

console.log(`Starting skance ${VERSION}...`);
export const skance = new Hono().basePath(`/${VERSION}`);
skance.use(httpLog);

// Admin routes
skance.route('/admin', adminRoot);
skance.route('/admin/tenants', tenants);

// Auth routes
//skance.route('/:tenantId/auth', authRoot);
//skance.route('/:tenantId/auth/token', token);
//skance.route('/:tenantId/auth/.well-known/openid-configuration', wellKnown);

Deno.serve({
  port: Number(config.listenPort),
  hostname: config.listenAddress
}, skance.fetch);