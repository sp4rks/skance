import { db } from "../../datastores/connect.ts";
import { App, ClientCredentialsApp } from "@skance/components/app/app.d.ts";
import { generateSecret } from "@skance/utilities/security.ts";
import { BadRequestError } from "@skance/utilities/errors.ts";

export async function createApp(tenantId: string, app: Omit<App, 'id' | 'createdAt' | 'updatedAt' | 'description'>) {

  switch (app.grantType) {
    case 'client_credentials':
      return await createClientCredentialsApp(tenantId, app as ClientCredentialsApp);
    default:
      throw new BadRequestError(`Unsupported grant type: ${app.grantType}`);
  }
}

async function createClientCredentialsApp(
  tenantId: string,
  app: Required<Pick<ClientCredentialsApp, 'name' | 'grantType'>> & 
      Partial<Omit<ClientCredentialsApp, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'grantType'>>
) {
  const now = new Date();

  const clientCredentialsApp: ClientCredentialsApp = {
    id: crypto.randomUUID(),
    name: app.name,
    description: app.description || undefined,
    createdAt: now,
    updatedAt: now,
    grantType: 'client_credentials',

    secret: generateSecret(),
    responseTypes: ['token']
  };

  return await db!.createApp(tenantId, clientCredentialsApp);
}