import chalk from 'chalk'
import config from 'config'
import Exiting from 'exiting'
import { compose } from './server/index.js'

const stage = `[stage: ${config.stage}]`

try {
  const server = await compose()
  const manager = Exiting.createManager(server)
  await manager.start()
  console.log(`${chalk.blue(stage)} server is listening on ${server.info.uri}`)
} catch (err) {
  console.error(`${stage} error occoured when starting server: ${err.message}`)
  process.exit(1)
}
