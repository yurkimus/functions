import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Applies a function to an array of arguments.
 *
 * @throws {TypeError} "predicate" must be a function
 * @throws {TypeError} "parameters" must be an array
 *
 * @example
 * ```javascript
 * apply(Math.max, [1, 2, 3]) // => 3
 * ```
 */
export var apply = curry((predicate, parameters) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  if (!isLike('Array', parameters)) {
    throw new TypeError('"parameters" must be an array-like')
  }

  if (!isLike('Iterable', parameters)) {
    throw new TypeError('"parameters" must have "Symbol.iterator"')
  }

  return predicate(...parameters)
}, 2)
