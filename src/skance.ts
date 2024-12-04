import { Context } from '@hono/hono';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';

import { config } from "@skance/config/config.ts";
import { httpLog } from '@skance/middleware/logging.ts';
import { tenantsRoute } from '@skance/routes/admin/tenants/tenantsRoute.ts';


export const VERSION = 'v1';

console.log(`Starting skance ${VERSION}...`);
export const skance = new OpenAPIHono().basePath(`/${VERSION}`);
// @ts-ignore Works fine; seems to be an issue in zod-openapi
skance.use(httpLog);

// Admin Routes
// skance.route('/admin', authRoot);
skance.route('/admin/tenants', tenantsRoute);

// Documentation Routes
skance.doc('/admin/openapi.json', (c: Context) => ({
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Skance AdminAPI',
  },
  servers: [
    {
      url: new URL(c.req.url).origin,
      description: 'Current environment',
    },
  ],
}))

const docsRoute = createRoute({
  method: 'get',
  path: '/admin/docs',
  responses: {}
});

skance.openapi(docsRoute, apiReference({
  spec: {
    url: `/${VERSION}/admin/openapi.json`,
  },
}));

Deno.serve({
  port: Number(config.listenPort),
  hostname: config.listenAddress,
// @ts-ignore Works fine; seems to be an issue in zod-openapi
}, (req) => skance.fetch(req));