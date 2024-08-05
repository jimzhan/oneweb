import config from 'config'
import Boom from '@hapi/boom'
import { Kafka, CompressionTypes } from 'kafkajs'

const noop = async () => { }
const compression = CompressionTypes.GZIP
const inner = {
  kafka: null,
  logger: null,
  producer: null,
  consumer: null
}
/**
 * Publish messages to the Kafka cluster.
 * SEEALSO [Producing]https://kafka.js.org/docs/producing)
 * SEEALSO [Message Structure](https://kafka.js.org/docs/producing#message-structure)
 * ----------------------------------------------------------------------------------------------------
 * @param {string} topic - topic name, e.g. 'order.placed'.
 * @param {object[]} messages - array of messages, example: `[{ key: 'my-key', value: 'my-value'}]`
 */
export const pub = async (topic, messages = []) => {
  inner.kafka = inner.kafka || new Kafka(config.kafka)
  inner.producer = inner.producer || inner.kafka.producer()
  inner.logger = inner.logger || inner.kafka.logger()
  const { producer, logger } = inner

  try {
    await producer.connect()
    await producer.send({ topic, messages, compression })
    logger.info(`[producer] published <messages: ${messages.length}>} to <topic> ${topic}>`)
  } catch (ex) {
    logger.error(`[producer] ${ex.message}`, { stack: ex.stack })
    throw Boom.badRequest()
  } finally {
    await producer.disconnect()
  }
}

/**
 * @param {string} topic - topic name, e.g. 'order.placed'.
 * @param {function} next - callback function.
 */
export const sub = async (topics, next = noop) => {
  inner.kafka = inner.kafka || new Kafka(config.kafka)
  inner.consumer = inner.consumer || inner.kafka.consumer()
  inner.logger = inner.logger || inner.kafka.logger()
  const { consumer, logger } = inner

  try {
    await consumer.connect()
    await consumer.subscribe({ topic: topics, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        next({ topic, message }).then(() => {
          logger.info(`[consumer] received <message: ${message.value}> from <topic: ${topic}>`)
        })
      }
    })
  } catch (ex) {
    logger.error(`[consumer] ${ex.message}`, { stack: ex.stack })
    throw Boom.badRequest()
  } finally {
    await consumer.disconnect()
  }
}
