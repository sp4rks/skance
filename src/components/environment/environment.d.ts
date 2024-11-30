import { KeyLike } from "jose";

import { App } from "@skance/components/app/app.d.ts";

export interface Environment {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  keyPair: KeyPair;
  apps: {[key: string]: App};
}

export interface KeyPair {
  privateJWK: KeyLike;
  publicJWK: KeyLike;
}