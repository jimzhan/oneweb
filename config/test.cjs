const crypto = require('crypto')
const IORedisMock = require('ioredis-mock')
const { Engine: Redis } = require('@hapi/catbox-redis')
// ----------------------------------------
// Settings for test environment.
// ----------------------------------------
module.exports = {
  db: {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './test.sqlite3',
      options: {
        readonly: false
      }
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  kafka: {
    clientId: 'backoffice',
    brokers: ['127.0.0.1:9092']
  },

  server: {
    host: '0.0.0.0',
    port: 8000,
    cache: [
      {
        name: 'RedisCache',
        provider: {
          constructor: Redis,
          options: {
            partition: 'cache',
            client: new IORedisMock()
          }
        }
      },
      {
        name: 'RedisSession',
        provider: {
          constructor: Redis,
          options: {
            partition: 'session',
            client: new IORedisMock()
          }
        }
      }
    ],
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*'],
        credentials: false
      },
      security: true
    },
    state: {
      strictHeader: true,
      ignoreErrors: false,
      isSecure: true,
      isHttpOnly: true,
      isSameSite: 'Lax',
      encoding: 'iron'
    }
  },

  yar: {
    name: 'sid',
    storeBlank: false,
    cache: {
      cache: 'RedisSession'
    },
    cookieOptions: {
      password: crypto.randomBytes(32).toString('base64url'),
      ttl: 60 * 60 * 24 * 1000
    }
  }
}
