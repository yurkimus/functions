import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Executes one of two functions based on a predicate.
 *
 * @throws {TypeError} "predicate" must be a function
 * @throws {TypeError} "onTrue" must be a function
 * @throws {TypeError} "onFalse" must be a function
 *
 * @example
 * ```javascript
 * // Standard invocation
 * condition(
 *  x => x === true,
 *  x => console.log('True'),
 *  x => console.log('False')
 * )(true) // => Logs 'True'
 * ```
 */
export var condition = curry(
  (predicate, onTrue, onFalse, ...parameters) => {
    if (!isLike('Function', predicate)) {
      throw new TypeError('"predicate" must be a function')
    }

    if (!isLike('Function', onTrue)) {
      throw new TypeError('"onTrue" must be a function')
    }

    if (!isLike('Function', onFalse)) {
      throw new TypeError('"onFalse" must be a function')
    }

    return predicate(...parameters)
      ? onTrue(...parameters)
      : onFalse(...parameters)
  },
  4,
)
