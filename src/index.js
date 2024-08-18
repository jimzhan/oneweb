import config from 'config'
import Exiting from 'exiting'
import { compose } from './server/index.js'

(async () => {
  try {
    const server = await compose()
    const manager = Exiting.createManager(server)
    await manager.start()
    console.log(`[stage: ${config.stage}] server is listening on ${server.info.uri}`)
  } catch (err) {
    console.error(`[stage: ${config.stage}] error occoured when starting server: ${err.message}`)
    process.exit(1)
  }
})()
