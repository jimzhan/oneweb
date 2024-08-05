import sinon from 'sinon'
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

sinon.stub(Kafka.prototype, 'producer').returns({
  connect: producer.connect,
  send: producer.send,
  disconnect: producer.disconnect
})
sinon.stub(Kafka.prototype, 'consumer').returns({
  connect: consumer.connect,
  subscribe: consumer.subscribe,
  run: consumer.run,
  disconnect: consumer.disconnect
})

const topic = 'test-topic'
const value = 'Hello World'

describe('kafka.pub/sub', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('publish a message with `kafkajs`', async () => {
    await kafka.pub('test-topic', [{ value: 'Hello World' }])

    expect(producer.connect).toHaveBeenCalledTimes(1)
    expect(producer.send).toHaveBeenCalledWith({
      topic,
      messages: [{ value }]
    })
    expect(producer.send).toHaveBeenCalledTimes(1)
    expect(producer.disconnect).toHaveBeenCalledTimes(1)
  })

  it('subscribe a topic with `kafkajs', async () => {
    await kafka.sub(topic, async (topic, message) => {
      expect(topic).toBe(topic)
      expect(message.value).toBe(value)
    })
    expect(consumer.connect).toHaveBeenCalledTimes(1)
    expect(consumer.subscribe).toHaveBeenCalledWith({
      topic,
      fromBeginning: true
    })
    expect(consumer.disconnect).toHaveBeenCalledTimes(1)
  })
})
