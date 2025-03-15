import { Map } from 'immutable'
import { AsyncLocalStorage } from 'node:async_hooks'

class Context {
  constructor() {
    this.als = new AsyncLocalStorage()
  }

  /**
   * Returns the value (or `undefined`) associated with the provided key.
   * @param {String} key - key to get.
   */
  get(key) {
    return this.als.getStore()?.get(key)
  }

  /**
   * Transitions into the context for the remainder of the current synchronous
   * execution and then persists the store through any following asynchronous calls.
   * ------------------------------------------------------------------------------------------
   * NOTE - This transition will continue for the entire synchronous execution. This means that if,
   * for example, the context is entered within an event handler subsequent event handlers will also
   * run within that context unless specifically bound to another context with an AsyncResource.
   * That is why run() should be preferred over enterWith() unless there are strong reasons to use the latter method.
   * ------------------------------------------------------------------------------------------
   * @param {Object} values - key-value object for setting up context.store with `immutable.Map`.
   */
  set(values) {
    const store = Map(values)
    this.als.enterWith(store)
  }

  /**
   * Runs a function synchronously within a context and returns its return value.
   * The store is not accessible outside of the callback function. The store is
   * accessible to any asynchronous operations created within the callback.
   * ------------------------------------------------------------------------------------------
   * NOTE - If the callback function throws an error, the error is thrown by `run()` too.
   * The stacktrace is not impacted by this call and the context is exited.
   * ------------------------------------------------------------------------------------------
   * @param {Object} values - key-value object for setting up context.store with `immutable.Map`.
   * @param {Function} fn - callback function to run.
   */
  run(values, fn, ...args) {
    const store = Map(values)
    return this.als.run(store, fn, ...args)
  }
}

export default new Context()
