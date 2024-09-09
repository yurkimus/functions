import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

/**
 * @param {*} properties
 * @param {*} object
 */
export var prop = curry((properties, value) => {
  if (isLike('Array', properties)) {
    return Array.prototype.reduce.call(
      properties,
      (value, property) => value?.[property],
      value,
    )
  }

  return value?.[properties]
})

/**
 * @param {*} properties
 * @param {*} object
 */
export var props = curry(
  (properties, object) => {
    if (!isLike('Array', properties)) {
      throw new TypeError(
        '"properties" must be an ArrayLike with elements according to the "properties" of the "prop" function',
      )
    }

    return Array.prototype.map.call(
      properties,
      (property) => prop(property, object),
    )
  },
)
