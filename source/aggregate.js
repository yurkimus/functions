import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Composes multiple functions into a single function applying aggregator to each call in the chain.
 *
 * @see {@link compose}
 *
 * @throws {TypeError} "aggregator" must be a function
 * @throws {TypeError} "predicates" must be a list of functions
 *
 * @example
 * ```javascript
 * // Standard invocation
 * aggregate(
 *  (f, ...parameters) => f(...parameters.with(0, parameters.at(0) + 1)),
 *  n => Math.pow(n, 2),
 *  x => x + 1
 * )(4) // => 49
 *
 * // Automatic ArrayLike arguments application
 * aggregate(
 *  (f, ...parameters) => f(...parameters.with(0, parameters.at(0) + 1)),
 *  Math.pow,
 *  x => [x + 1, 2]
 *  )(4) // => 49
 * ```
 */
export var aggregate = curry(
  (aggregator, ...predicates) => {
    if (!isLike('Function', aggregator)) {
      throw new TypeError('"aggregator" must be a function')
    }

    if (!predicates.every(isLike('Function'))) {
      throw new TypeError('"predicates" must be a list of functions')
    }

    return (...parameters) =>
      predicates.reduceRight((parameters, predicate) => {
        if (isLike('Array', parameters)) {
          if (!isLike('Iterable', parameters)) {
            throw new TypeError('"parameters" must have Symbol.iterator')
          }

          return aggregator(predicate, ...parameters)
        }

        return aggregator(predicate, parameters)
      }, parameters)
  },
  2,
)
