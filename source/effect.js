import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Executes a function for its side-effects and returns the original parameter.
 *
 * @throws {TypeError} "predicate" must be a function
 *
 * @example
 * ```javascript
 * effect(console.log, 'Hello') // Logs 'Hello', returns 'Hello'
 * ```
 */
export var effect = curry((predicate, parameter) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  return predicate(parameter), parameter
})
