import Exiting from 'exiting'
import { compose } from './server/server.js'

try {
  const server = await compose()
  const manager = Exiting.createManager(server)
  await manager.start()
  console.log(`Server is listening on ${server.info.uri}`)
} catch (err) {
  console.error(`Error occoured when starting server: ${err.message}`)
  process.exit(1)
}
