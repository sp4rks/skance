import { blue } from "jsr:@std/fmt/colors";

import { skance } from "@skance/skance.ts";
import { VERSION as v } from "@skance/skance.ts";
import * as skAssert from "@skance/utilities/prettyAssertions.ts";

const state = {
  tenantId: null
};

Deno.test(blue("GET /v1/admin"), async () => {
  const response = await skance.request(`/${v}/admin`);
  const payload = await response.json();

  skAssert.statusCode(response, 200);
  skAssert.message(payload, "Admin API");
  skAssert.timestamp(payload.timestamp);
});

Deno.test(blue(`GET /${v}/admin/tenants`), async () => {
  const response = await skance.request(`/${v}/admin/tenants`);
  const payload = await response.json();

  skAssert.statusCode(response, 200);
  skAssert.object(payload);
});

Deno.test(blue(`POST /${v}/admin/tenants`), async () => {
  const response = await skance.request(`/${v}/admin/tenants`, {
    method: "POST",
    body: JSON.stringify({
      name: "Test Tenant",
    })
  });
  const payload = await response.json();
  state.tenantId = payload.id;

  skAssert.statusCode(response, 201);
  skAssert.object(payload);
});

Deno.test(blue(`GET /${v}/admin/tenants/${state.tenantId}`), async () => {
  const response = await skance.request(`/${v}/admin/tenants/${state.tenantId}`);
  const payload = await response.json();

  skAssert.statusCode(response, 200);
  skAssert.object(payload);
});
