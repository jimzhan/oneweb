import config from 'config'
import { Kafka } from 'kafkajs'
import { pkg } from '../core/index.js'

export const kafka = new Kafka(config.kafka)

const logger = kafka.logger()

const noop = async () => { }

const producer = kafka.producer()

const consumer = kafka.consumer({ groupId: pkg.name })

/**
 * Publish messages to the Kafka cluster.
 * SEEALSO [Producing]https://kafka.js.org/docs/producing)
 * SEEALSO [Message Structure](https://kafka.js.org/docs/producing#message-structure)
 * ----------------------------------------------------------------------------------------------------
 * @param {string} topic - topic name, e.g. 'order.placed'.
 * @param {object[]} messages - array of messages, example: `[{ key: 'my-key', value: 'my-value'}]`
 */
export const pub = async (topic, messages = []) => {
  await producer.connect()
  try {
    await producer.send({ topic, messages })
    logger.info(`[producer] published <messages: ${messages.length}>} to <topic> ${topic}>`)
  } catch (ex) {
    logger.error(`[producer] ${ex.message}`, { stack: ex.stack })
  } finally {
    await producer.disconnect()
  }
}

/**
 * @param {string} topic - topic name, e.g. 'order.placed'.
 * @param {function} next - callback function.
 */
export const sub = async (topics, next = noop) => {
  await consumer.connect()
  try {
    await consumer.subscribe({ topic: topics, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        await next(topic, message)
        logger.info(`[consumer] received <message: ${message.value}> from <topic: ${topic}>`)
      }
    })
  } catch (ex) {
    logger.error(`[consumer] ${ex.message}`, { stack: ex.stack })
  } finally {
    await consumer.disconnect()
  }
}
