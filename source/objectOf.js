import { curry } from '@yurkimus/curry'
import { is, isLike } from '@yurkimus/types'

/**
 * Creates an object from keys and values.
 *
 * @throws {TypeError} "keys" must be a string or an array of keys
 *
 * @example
 * ```javascript
 * // Standard invocation
 * objectOf('a', 1) // returns { a: 1 }
 *
 * // Multiple keys invocation
 * objectOf(['a', 'b'], [1, 2]) // => { a: 1, b: 2 }
 * ```
 */
export var objectOf = curry(
  (keys, values) => {
    if (!is('String', keys) || !isLike('Array', keys)) {
      throw new TypeError('"keys" must be a string or an ArrayLike')
    }

    if (is('String', keys)) {
      return { [keys]: values }
    }

    if (isLike('Array')) {
      return Array.prototype.reduce.call(
        (object, key, index) => ((object[key] = values[index]), object),
        {},
      )
    }
  },
)
