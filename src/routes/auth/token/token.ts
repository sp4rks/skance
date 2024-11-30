import { Hono } from "jsr:@hono/hono";
import * as jose from 'jose';
//import { readTenant } from '@skance/components/tenant/tenantController.ts';

const secret = "your-256-bit-secret"; // TODO: Move to secure configuration

const signingKey = crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secret),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);

export const token = new Hono();

token.post("/", async (c) => {
  const tenantId = c.req.param('tenantId');
  //const formData = await c.req.parseBody();

  //const grantType = formData['grant_type'];
  //const clientId = formData['client_id'];
  //const clientSecret = formData['client_secret'];

  //let tenant;
  //try {
  //  tenant = await readTenant(tenantId);
  //} catch (_error) {
  //  return c.json({ error: 'Tenant not found' }, 404);
  //}




  // Create a JWT with some claims
  const jwt = await new jose.SignJWT({
    'client_id': clientId,
    'iss': 'John Doe',
    'jti': '1234567890',
    'iat': Math.floor(Date.now() / 1000),
    'exp': Math.floor(Date.now() / 1000) + 2 * 60 * 60,
    'aud': ["https://api.skance.com/"],
    'tenant': tenantId

  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(await signingKey);

  return c.json({ token: jwt });

});
