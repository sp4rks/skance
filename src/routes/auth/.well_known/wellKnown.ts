import { Hono } from "jsr:@hono/hono";

export const wellKnown = new Hono();

wellKnown.get("/", (c) => {

  const tenantId = c.req.param('tenantId');

  return c.json({
    issuer: `https://auth.example.com/${tenantId}`,
    authorization_endpoint: `https://auth.example.com/${tenantId}/auth`,
    token_endpoint: `https://auth.example.com/${tenantId}/token`,
    userinfo_endpoint: `https://auth.example.com/${tenantId}/userinfo`,
    jwks_uri: `https://auth.example.com/${tenantId}/.well-known/jwks.json`,
    registration_endpoint: `https://auth.example.com/${tenantId}/register`,
    scopes_supported: ["openid", "profile", "email"],
    response_types_supported: ["code", "token", "id_token", "code token", "code id_token"],
    grant_types_supported: ["authorization_code", "implicit", "refresh_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    token_endpoint_auth_methods_supported: ["client_secret_basic"],
    claims_supported: ["sub", "iss", "name", "email"]
  });
});
