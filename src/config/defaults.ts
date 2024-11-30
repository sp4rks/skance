const skanceRoot = new URL("../../", import.meta.url).pathname;

export default {
  "SK_ROOT": {
    "name": "skanceRoot",
    "value": skanceRoot
  },
  "SK_LOG_LEVEL": {
    "name": "logLevel",
    "value": "error"
  },
  "SK_LISTEN_ADDRESS": {
    "name": "listenAddress",
    "value": "127.0.0.1"
  },
  "SK_LISTEN_PORT": {
    "name": "listenPort",
    "value": 8000
  },
  "SK_DB_TYPE": {
    "name": "dbType",
    "value": "lowdb"
  },
  "SK_DB_LOWDB_PATH": {
    "name": "dbLowDbPath",
    "value": `${skanceRoot}db.json`
  },
  "SK_DEFAULT_SIGNING_ALGORITHM": {
    "name": "defaultSigningAlgorithm",
    "value": "RS256"
  }
};
