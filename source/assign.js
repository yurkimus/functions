import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * Assigns a property to an object.
 *
 * @throws {TypeError} "object" must be a truthy value
 *
 * @example
 * ```javascript
 * assign('a', 1, { b: 2 }) // => 1
 * ```
 */
export var assign = curry(
  (property, value, object) => {
    if (!isLike('Object', object)) {
      throw new TypeError('"object" must be an object')
    }

    return object[property] = value
  },
)
