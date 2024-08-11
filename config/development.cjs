const { nanoid } = require('nanoid')
const { Engine: Redis } = require('@hapi/catbox-redis')
// ----------------------------------------
// Local development settings.
// ----------------------------------------
module.exports = {
  db: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      database: 'postgres',
      password: 'postgres',
      pool: {
        min: 5,
        max: 10
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
            partition: 'cache'
          }
        }
      },
      {
        name: 'RedisSession',
        provider: {
          constructor: Redis,
          options: {
            partition: 'session'
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
      password: nanoid(36),
      ttl: 1000 * 60 * 60 * 24 * 7
    }
  }
}
