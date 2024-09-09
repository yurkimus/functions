import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Aggregates the results of multiple functions.
 *
 * @throws {TypeError} "aggregator" must be a function
 * @throws {TypeError} "predicates" must be an array of functions
 *
 * @example
 * ```javascript
 * use(Math.pow, x => x, x => x + 2)(5, 1) // => 25
 * ```
 */
export var use = curry(
  (aggregator, ...predicates) => {
    if (!isLike('Function', aggregator)) {
      throw new TypeError('"aggregator" must be a function')
    }

    if (!predicates.every(isLike('Function'))) {
      throw new TypeError('"predicates" must be an array of functions')
    }

    return (...parameters) =>
      aggregator(
        ...predicates.map((predicate, index) => predicate(parameters[index])),
      )
  },
  2,
)
