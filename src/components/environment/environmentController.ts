import { generateKeyPair, exportJWK } from "jose";

import { db } from "@skance/datastores/connect.ts";
import { appLog } from "@skance/middleware/logging.ts";
import { shortId } from "@skance/utilities/shortId.ts";
import { Tenant } from "@skance/components/tenant/tenant.d.ts";
import { InternalServerError } from "@skance/utilities/errors.ts";
import { createApp } from "@skance/components/app/appController.ts";
import { Environment, KeyPair } from "@skance/components/environment/environment.d.ts";

import { config } from "@skance/config/config.ts";


export async function createTenant(name: string) {
  const now = new Date();
  const tenantId = shortId();
  
  // Generate a key pair for the tenant
  const { privateKey, publicKey } = await generateKeyPair(config.defaultSigningAlgorithm, {extractable: true});
  const privateJWK = await exportJWK(privateKey);
  const publicJWK = await exportJWK(publicKey);

  const tenant: Tenant = {
    id: tenantId,
    name,
    createdAt: now,
    updatedAt: now,
    keyPair: {
      privateJWK: { ...privateJWK, type: config.defaultSigningAlgorithm },
      publicJWK: { ...publicJWK, type: config.defaultSigningAlgorithm }
    },
    apps: {}
  }

  // Create the tenant in the database
  try {
    await db!.createTenant(tenant);
    appLog.info(`Created tenant ${tenant.id}`);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stackTrace = error instanceof Error ? error.stack : 'No stack trace available';
    appLog.error(`Error creating tenant: ${errorMessage}\r\nStack trace: ${stackTrace}`);
    throw new InternalServerError(`Error creating tenant: ${errorMessage}`);
  }

  // Create the default client credentials application
  await createApp(tenant.id, {
    grantType: "client_credentials",
    name: `Admin API Client`,
  });

  return await db!.readTenant(tenantId);
}

export async function readEnvs() {
  return await db!.readEnvs();
}

export async function readTenant(tenantId: string) {
  return await db!.readTenant(tenantId);
}
