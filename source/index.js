import { curry } from '@yurkimus/curry'
import { is } from '@yurkimus/types'

export let always = parameter => () => parameter

export let apply = curry(
  (predicate, ...parameters) => {
    if (typeof predicate !== 'function')
      throw new TypeError(`Parameter 'predicate' must be a function.`)

    return predicate.apply(null, ...parameters)
  },
  2,
)

export let asynchronous = (predicate, ...parameters) => {
  if (typeof predicate !== 'function')
    throw new TypeError(`Parameter 'predicate' must be a function.`)

  return new Promise((resolve, reject) => {
    try {
      resolve(predicate(...parameters))
    } catch (reason) {
      reject(reason)
    }
  })
}

export let construct = curry(
  (predicate, ...parameters) => {
    if (typeof predicate !== 'function')
      throw new TypeError(`Parameter 'predicate' must be a function.`)

    return Reflect.construct(predicate, parameters)
  },
  2,
)

export let defer = curry(
  (predicate, ...parameters) => {
    if (typeof predicate !== 'function')
      throw new TypeError(`Parameter 'predicate' must be a function.`)

    return () => predicate(...parameters)
  },
  2,
)

export let effect = curry(
  (predicate, value) => {
    if (typeof predicate !== 'function')
      throw new TypeError(`Parameter 'predicate' must be a function.`)

    return (predicate(value), value)
  },
)

export let has = curry(
  (properties, value) =>
    is('Array', properties)
      ? has(
        properties.at(-1),
        prop(properties.slice(0, -1), value),
      )
      : value && typeof value === 'object' && properties in value,
)

export let identity = parameter => parameter

export let partial = curry(
  (predicate, ...parameters) => {
    if (typeof predicate !== 'function')
      throw new TypeError(`Parameter 'predicate' must be a function.`)

    return predicate.bind(null, ...parameters)
  },
  2,
)

export let prop = curry(
  (properties, value) =>
    is('Array', properties)
      ? properties.reduce((value, property) => value?.[property], value)
      : value?.[properties],
)

export let raise = (predicate, ...parameters) => {
  if (typeof predicate !== 'function')
    throw new TypeError(`Parameter 'predicate' must be a function.`)

  throw predicate(...parameters)
}
