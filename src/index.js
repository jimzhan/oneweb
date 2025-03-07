import Exiting from 'exiting'
import { server } from './server/index.js'

try {
  const manager = Exiting.createManager(server)
  await manager.start()
  console.log(`Server is listening on ${server.info.uri}`)
} catch (err) {
  console.error(`Error occoured when starting server: ${err.message}`)
  process.exit(1)
}
