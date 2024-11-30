export interface App {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  grantType: string;
  enabled: boolean;
}

export interface ClientCredentialsApp extends App {
  grantType: "client_credentials";
  responseTypes: ("code" | "token" | "id_token")[];
  secret: string;
}
