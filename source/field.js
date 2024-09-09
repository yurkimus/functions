import { curry } from '@yurkimus/curry'
import { isLike, type } from '@yurkimus/types'

export var field = curry(
  (key, object) => {
    switch (type(object)) {
      case 'Array':
      case 'TypedArray':
      case 'BigInt64Array':
      case 'BigUint64Array':
      case 'Float16Array':
      case 'Float32Array':
      case 'Float64Array':
      case 'Int16Array':
      case 'Int32Array':
      case 'Int8Array':
      case 'Uint16Array':
      case 'Uint32Array':
      case 'Uint8Array':
      case 'Uint8ClampedArray':
        return object.at(key)

      case 'Map':
      case 'WeakMap':
      case 'Headers':
      case 'URLSearchParams':
      case 'FormData':
        return object.get(key)

      case 'CSSStyleDeclaration':
        return object.getPropertyValue(key)

      case 'Storage':
        return object.getItem(key)

      case 'Object':
        return Object.hasOwn(object, key) ? object[key] : undefined

      default:
        throw new TypeError(
          `Getter for type "${type(object)}" is not implemented`,
        )
    }
  },
)

export var fields = curry(
  (keys, object) => {
    if (!isLike('Array', keys)) {
      throw new TypeError(
        '"keys" must be an ArrayLike with elements according to the "key" of the "field" function',
      )
    }

    return Array.prototype.map.call(
      keys,
      (key) => field(key, object),
    )
  },
)
