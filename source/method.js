import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Invokes a method on an object. No need to provide any arguments as with invoke
 *
 * @see {@link invoke} {@link trigger}
 *
 * @throws {TypeError} "method" must exists on "object"
 * @throws {TypeError} "method" must be a function
 *
 * @example
 * ```javascript
 * method('toUpperCase', 'Hello!') // => 'HELLO!'
 * ```
 */
export var method = curry((method, object, ...parameters) => {
  if (!(method in object)) {
    throw new TypeError('"method" must exists on "object"')
  }

  if (!isLike('Function', object[method])) {
    throw new TypeError('"method" must be a function')
  }

  return object[method](...parameters)
}, 2)
