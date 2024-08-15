import { isLike } from '@yurkimus/types'

/**
 * Extracts the results of multiple functions applied to provided arguments.
 *
 * @throws {TypeError} "predicates" must be an array of functions
 *
 * @example
 * ```javascript
 * extract(
 *  date => date.getMonth(),
 *  date => date.getDay()
 * )(new Date()) // returns [6, 3]
 * ```
 */
export var extract = (...predicates) => (...parameters) => {
  if (!predicates.every(isLike('Function'))) {
    throw new TypeError('"predicates" must be an array of functions')
  }

  return predicates.map((predicate) => predicate(...parameters))
}
