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
 * applyTo([1, 2, 3], Math.max) // => 3
 * ```
 */
export var applyTo = curry((parameters, predicate) => {
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
