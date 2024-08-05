import sinon from 'sinon'
import Boom from '@hapi/boom'
import { Kafka } from 'kafkajs'
import * as kafka from './kafka.js'
import { describe, it, expect, afterEach, vi } from 'vitest'

const producer = {
  connect: vi.fn(),
  send: vi.fn(async () => true),
  disconnect: vi.fn()
}

const consumer = {
  connect: vi.fn(),
  subscribe: vi.fn(),
  run: vi.fn(),
  disconnect: vi.fn()
}

const logger = {
  info: vi.fn(),
  error: vi.fn()
}

sinon.stub(Kafka.prototype, 'producer').returns(producer)
sinon.stub(Kafka.prototype, 'consumer').returns(consumer)
sinon.stub(Kafka.prototype, 'logger').returns(logger)

const topic = 'test-topic'
const value = 'Hello World'

describe('kafka.pub/sub', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('publish a message with `kafkajs`', async () => {
    await kafka.pub('test-topic', [{ value: 'Hello World' }])
    expect(kafka.pub).not.toThrowError()
    expect(logger.error).toHaveBeenCalledTimes(0)
    expect(producer.connect).toHaveBeenCalledTimes(2)
    expect(producer.send).toHaveBeenCalledWith({
      topic,
      compression: 1,
      messages: [{ value }]
    })
    expect(producer.send).toHaveBeenCalledTimes(1)
    expect(producer.disconnect).toHaveBeenCalledTimes(1)
  })

  it('publish a wrong message with `kafkajs`', async () => {
    try {
      expect(await kafka.pub(topic, [undefined]))
    } catch (ex) {
      expect(ex).toBeInstanceOf(Boom)
      expect(logger.error).toHaveBeenCalledTimes(1)
    }
  })

  it('subscribe a topic with `kafkajs', async () => {
    await kafka.sub(topic, async (topic, message) => {
      expect(topic).toBe(topic)
      expect(message.value).toBe(value)
    })
    expect(logger.error).toHaveBeenCalledTimes(0)
    expect(kafka.sub).not.toThrowError()
    expect(consumer.connect).toHaveBeenCalledTimes(2)
    expect(consumer.subscribe).toHaveBeenCalledWith({
      topic,
      fromBeginning: true
    })
    expect(consumer.disconnect).toHaveBeenCalledTimes(1)
  })

  it('consumes messages with `kafkajs', async () => {
    const next = vi.fn(async () => true)
    const message = { key: 'key', value: 'Hello Kafka' }
    // Simulate an incoming message
    consumer.run.mockImplementationOnce(({ eachMessage }) => {
      eachMessage({ topic, partition: 0, message })
    })
    await kafka.sub(topic, next)
    expect(kafka.sub).not.toThrowError()
    expect(logger.error).toHaveBeenCalledTimes(0)
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ topic }))
  })
})
