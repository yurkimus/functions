import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Invokes a method on an object. At least one argument must be provided.
 *
 * @see {@link trigger} {@link method}
 *
 * @throws {TypeError} "method" must exist on "object"
 * @throws {TypeError} "method" must be a function
 *
 * @example
 * ```javascript
 * invoke('at', ['a', 'b', 'c'], 1) // => 'b'
 * ```
 */
export var invoke = curry((method, object, ...parameters) => {
  if (!(method in object)) {
    throw new TypeError('"method" must exist on "object"')
  }

  if (!isLike('Function', object[method])) {
    throw new TypeError('"method" must be a function')
  }

  return object[method](...parameters)
}, 3)
