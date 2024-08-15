import { curry } from '@yurkimus/curry'
import { type } from '@yurkimus/types'

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
export var assign = curry((property, value, object) => {
  if (['Null', 'Undefined'].includes(type(object))) {
    throw new TypeError('"object" must be a truthy value')
  }

  return (object[property] = value)
})
