import { curry } from '@yurkimus/curry'

export var includes = curry((value, object) => {
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
      return object.includes(value)

    case 'Map':
    case 'Headers':
    case 'URLSearchParams':
    case 'FormData':
      return Array
        .from(object)
        .map((entry) => entry.at(1))
        .includes(value)

    case 'CSSStyleDeclaration':
      return object.getPropertyValue(value)

    case 'Storage':
      return object.getItem(value)

    case 'DataTransfer':
      return object.getData(value)

    case 'Date':
      return object.getTime()

    default:
      throw new TypeError(
        `Getter for type "${type(object)}" is not implemented`,
      )
  }
})
