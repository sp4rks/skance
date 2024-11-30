import { config } from "@skance/config/config.ts";
import { LowDBStore } from "@skance/datastores/lowdb/lowdb.ts";
import { Datastore } from "@skance/datastores/datastore.d.ts";

let db: Datastore;

if (config.dbType === "lowdb") {
  db = new LowDBStore();
} else {
  throw new Error(`Unsupported data store type: ${config.dbType}`);
}

export { db };