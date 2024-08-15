import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Adds an onfulfilled predicate to a Promise.
 *
 * @throws {TypeError} "predicate" must be a function
 * @throws {TypeError} "thenable" must have method "then"
 * @throws {TypeError} property "then" of "thenable" must be a function
 *
 * @example
 * ```javascript
 * then(console.log, Promise.resolve('Hello!')) // Logs 'Hello!'
 * ```
 */
export var then = curry((predicate, thenable) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  if (!('then' in thenable)) {
    throw new TypeError('"thenable" must have method "then"')
  }

  if (!isLike('Function', thenable.then)) {
    throw new TypeError('property "then" of "thenable" must be a function')
  }

  return thenable.then(predicate)
})