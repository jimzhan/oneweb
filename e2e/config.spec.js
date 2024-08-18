import { afterEach, beforeEach, describe, expect, expectTypeOf, it } from 'vitest'

describe('config', async () => {
  beforeEach(async () => {
    process.env.NODE_ENV = 'production'
  })

  afterEach(async () => {
    process.env.NODE_ENV = 'test'
  })

  it('should load settings from custom environment variables', async () => {
    // db settings
    process.env.DB_HOST = 'db.example.com'
    process.env.DB_PORT = '5432'
    process.env.DB_USER = 'db_user'
    process.env.DB_NAME = 'db_name'
    process.env.DB_PASS = 'db_pass'
    process.env.DB_POOL_MIN = '5'
    process.env.DB_POOL_MAX = '10'
    // Kafka settings
    process.env.KAFKA_CLIENT_ID = 'kafka_client_id'
    process.env.KAFKA_BROKERS = '["kafka_brokers"]'
    // server settings
    process.env.HOST = 'www.example.com'
    process.env.PORT = '80'
    process.env.CORS_ORIGIN = "['www.example.com']"
    // yar cookie settings
    process.env.YAR_NAME = 'yar_name'
    process.env.YAR_STORE_BLANK = 'true'
    process.env.YAR_SECRET = 'yar_secret'
    process.env.YAR_TTL = '1234567890'

    const { default: config } = await import('config')
    // db settings
    expect(config.db.connection.host).toBe('db.example.com')
    expect(config.db.connection.port).toBe(5432)
    expect(config.db.connection.user).toBe('db_user')
    expect(config.db.connection.database).toBe('db_name')
    expect(config.db.connection.password).toBe('db_pass')
    expect(config.db.connection.pool.min).toBe(5)
    expect(config.db.connection.pool.max).toBe(10)
    // kafka settings
    expect(config.kafka.clientId).toBe('kafka_client_id')
    expectTypeOf(config.kafka.brokers).toBeArray()
    expect(config.kafka.brokers[0]).toBe('kafka_brokers')
    // server settings
    expect(config.server.host).toBe('www.example.com')
    expect(config.server.port).toBe(80)
    expectTypeOf(config.server.routes.cors.origin).toBeArray()
    expect(config.server.routes.cors.origin[0]).toBe('www.example.com')
    // yar cookie settings
    expect(config.yar.name).toBe('yar_name')
    expect(config.yar.storeBlank).toBe(true)
    expect(config.yar.cookieOptions.password).toBe('yar_secret')
    expect(config.yar.cookieOptions.ttl).toBe(1234567890)
  })
})
