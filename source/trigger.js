import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Triggers a method on an object with provided arguments.
 *
 * @see {@link invoke} {@link method}
 *
 * @throws {TypeError} "method" must exist on "object"
 * @throws {TypeError} "method" must be a function
 *
 * @example
 * ```javascript
 * trigger('has', 'status')(new URLSearchParams()) // => false
 * ```
 */
export var trigger = curry(
  (method, ...parameters) => (object) => {
    if (!(method in object)) {
      throw new TypeError('"method" must exist on "object"')
    }

    if (!isLike('Function', object[method])) {
      throw new TypeError('"method" must be a function')
    }

    return object[method](...parameters)
  },
  2,
)
