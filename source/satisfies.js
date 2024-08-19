import { curry } from '@yurkimus/curry'
import { isLike } from '@yurkimus/types'

export var satisfies = curry(
  (predicate, ...parameters) => {
    if (!isLike('Function', predicate)) {
      throw new TypeError('"predicate" must be a function')
    }

    return Boolean(predicate(...parameters))
  },
  2,
)
