import { isLike } from '@yurkimus/types'

/**
 * Composes multiple functions into a single function.
 *
 * @throws {TypeError} "predicates" must be a list of functions
 *
 * @example
 * ```javascript
 * // Standard invocation
 * compose(n => Math.pow(n, 2), n => n + 1)(5) // => 25
 *
 * // Automatic ArrayLike arguments application
 * compose(Math.pow, n => [n + 1, 2])(4) // => 25
 * ```
 */
export var compose = (...predicates) => {
  if (!predicates.every(isLike('Function'))) {
    throw new TypeError('"predicates" must be a list of functions')
  }

  return (...parameters) =>
    predicates.reduceRight((parameters, predicate) => {
      if (isLike('Array', parameters)) {
        if (!isLike('Iterable', parameters)) {
          throw new TypeError('"parameters" must have Symbol.iterator')
        }

        return predicate(...parameters)
      }

      return predicate(parameters)
    }, parameters)
}
