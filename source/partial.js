import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Partially applies a function.
 *
 * @throws {TypeError} "predicate" must be a function
 *
 * @example
 * ```javascript
 * let add = (a, b) => a + b
 *
 * partial(add, 1)(2) // => 3
 * ```
 */
export var partial = curry(
  (predicate, ...parameters) => {
    if (!isLike('Function', predicate)) {
      throw new TypeError('"predicate" must be a function')
    }

    return predicate.bind(null, ...parameters)
  },
  2,
)
