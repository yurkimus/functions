import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Defers the execution of a function.
 *
 * @throws {TypeError} "predicate" must be a function
 *
 * @example
 * ```javascript
 * let add = (a, b) => a + b
 *
 * defer(add, 1, 2)() // => 3
 * ```
 */
export var defer = curry((predicate, ...parameters) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  return () => predicate(...parameters)
}, 2)
