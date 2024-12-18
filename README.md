# Skance
<img src="assets/skance.png" alt="Skance Logo" width="300" />

### Next Gen Identity. Cloud native. Cloud agnostic.

## Server Configuration
Server configuration is managed exclusively via environment variables, and is stored in memory at runtime. A default configuration is maintained in `/src/config/definitions.js`, allowing a quickstart instance of Skance to run with no manual config.

**This file should not be manually edited**

The available server configuration parameters are as follows:

| Environment Variable | In Code  | Default Value | Valid Values | Description |
| -------------------- | -------- | ------------- | ------------ | ----------- |
| SK_LOG_LEVEL | logLevel | info | debug, info, warn, error | Verbosity of the logs generated by skance
| SK_LISTEN_ADDRESS | listenAddress | 0.0.0.0 | Any IP address | Listen IP address of the skance admin service
| SK_LISTEN_PORT | listenPort | 3000 | 1-65535 | Listen TCP port of the skance admin service
| SK_CONFIG_STORE | configStore | lowdb,mongodb | Any valid file path | Datastore used for tenant configuration
| SK_LOWDB_FILE | lowdbFile | db.json | Any valid file path | If lowdb is configured, the location of the DB file relative to the run path


## Datastores

[lowdb](https://github.com/typicode/lowdb) is the default datastore, allowing quick and easy testing of Skance. In real world environments, use a separately managed datastore such as [MongoDB](https://www.mongodb.com/).

### Abstraction

Skance has been built from the ground up to allow for any datastore to be used. This is done via a datastore class in `/src/datastores/index.js`, with specific datastore adapters managed in subfolders of `/src/datastores`. Adapters written for specific datastores need to extend Datastore and implement **all** methods defined in the base class.

Adapters for the following datastores are included:

- lowdb
- mongodb

## IdP Configuration
IdP configuration is managed exclusively via the admin API, and is stored in the configured datastore.

### Structure
The tenant configuration structure is as follows:

```
[
  "tenant": [
    "team" {
      "environment": []
    }
  ]
]
```