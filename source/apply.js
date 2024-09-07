import { curry } from '@yurkimus/curry'
import { is, isLike } from '@yurkimus/types'

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

  if (!is('Array', parameters)) {
    throw new TypeError('"parameters" must be an array')
  }

  return predicate(...parameters)
}, 2)
