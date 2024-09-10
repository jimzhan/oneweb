import { AsyncLocalStorage } from 'node:async_hooks'

const ctx = new AsyncLocalStorage()

export default ctx
