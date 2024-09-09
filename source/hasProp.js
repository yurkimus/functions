import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

export var hasProp = curry(
  (properties, value) => {
    if (isLike('Array', properties)) {
      return Boolean(Array.prototype.reduce.call(
        properties,
        (value, property) =>
          isLike('Object', value) && (property in value)
            ? value[property]
            : undefined,
        value,
      ))
    }

    return isLike('Object', value) && (properties in value)
  },
)

export var hasProps = curry(
  (properties, object) => {
    if (!isLike('Array', properties)) {
      throw new TypeError(
        '"properties" must be an ArrayLike with elements according to the "properties" of the "prop" function',
      )
    }

    return Array.prototype.map.call(
      properties,
      (property) => hasProp(property, object),
    )
  },
)
