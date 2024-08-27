import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

export var unless = curry(
  (predicate, onFalse, ...parameters) => {
    if (!isLike('Function', predicate)) {
      throw new TypeError('"predicate" must be a function')
    }

    if (!isLike('Function', onFalse)) {
      throw new TypeError('"onFalse" must be a function')
    }

    return Boolean(predicate(...parameters))
      ? parameters.at(0)
      : onFalse(...parameters)
  },
  3,
)
