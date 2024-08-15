import { curry } from '@yurkimus/curry'

/**
 * Modifies an object based on a scheme.
 *
 * @example
 * ```javascript
 * modify(
 *  { a: x => x + 1 },
 *  { a: 1, b: 2 }
 * ) // => { a: 2, b: 2 }
 */
export var modify = curry((by, object) => {
  var result = {}

  for (var key in object) {
    if (Object.hasOwn(object, key)) {
      result[key] = by[key]?.(object[key]) ?? object[key]
    }
  }

  return result
})
