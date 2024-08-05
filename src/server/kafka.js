import config from 'config'
import { Kafka } from 'kafkajs'
import { pkg } from '../core/index.js'

const noop = async () => { }
/**
 * Publish messages to the Kafka cluster.
 * SEEALSO [Producing]https://kafka.js.org/docs/producing)
 * SEEALSO [Message Structure](https://kafka.js.org/docs/producing#message-structure)
 * ----------------------------------------------------------------------------------------------------
 * @param {string} topic - topic name, e.g. 'order.placed'.
 * @param {object[]} messages - array of messages, example: `[{ key: 'my-key', value: 'my-value'}]`
 */
export const pub = async (topic, messages = []) => {
  const kafka = new Kafka(config.kafka)
  const producer = kafka.producer()
  const logger = kafka.logger()

  try {
    await producer.connect()
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
  const kafka = new Kafka(config.kafka)
  const logger = kafka.logger()
  const consumer = kafka.consumer({ groupId: pkg.name })

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
  } finally {
    await consumer.disconnect()
  }
}
