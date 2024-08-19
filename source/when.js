import { isLike } from '@yurkimus/types'
import { curry } from '@yurkimus/curry'

export var when = curry(
  (predicate, onTrue, ...parameters) => {
    if (!isLike('Function', predicate)) {
      throw new TypeError('"predicate" must be a function')
    }

    if (!isLike('Function', onTrue)) {
      throw new TypeError('"onTrue" must be a function')
    }

    return Boolean(predicate(...parameters))
      ? onTrue(...parameters)
      : parameters.at(0)
  },
  3,
)
