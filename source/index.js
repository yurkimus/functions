import { type, is, isLike } from '@yurkimus/types'

/**
 * Returns the same value.
 *
 * @template {any} Parameter
 *
 * @param {Parameter} value
 *
 * @returns {Parameter}
 *
 * @example
 * ```javascript
 * identity(42) // => 42
 * ```
 */
export var identity = (value) => value

/**
 * Returns a curried version of a function.
 *
 * @throws {TypeError} "predicate" must be a function
 * @throws {TypeError} "length" must be a number
 *
 * @example
 * ```javascript
 * let add = (a, b) => a + b
 *
 * curry(add)(1)(2) // => 3
 * ```
 */
export var curry = (predicate, length = predicate.length) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  if (!is('Number', length)) {
    throw new TypeError('"length" must be a number')
  }

  return (...parameters) =>
    parameters.length >= length
      ? predicate(...parameters)
      : curry(predicate.bind(null, ...parameters), length - parameters.length)
}

/**
 * Composes multiple functions into a single function.
 *
 * @throws {TypeError} "predicates" must be a list of functions
 *
 * @example
 * ```javascript
 * // Standard invocation
 * compose(n => Math.pow(n, 2), n => n + 1)(5) // => 25
 *
 * // Automatic ArrayLike arguments application
 * compose(Math.pow, n => [n + 1, 2])(4) // => 25
 * ```
 */
export var compose = (...predicates) => {
  if (!predicates.every((predicate) => isLike('Function', predicate))) {
    throw new TypeError('"predicates" must be a list of functions')
  }

  return (...parameters) =>
    predicates.reduceRight((parameters, predicate) => {
      if (isLike('Array', parameters)) {
        if (!isLike('Iterable', parameters)) {
          throw new TypeError('"parameters" must have Symbol.iterator')
        }

        return predicate(...parameters)
      }

      return predicate(parameters)
    }, parameters)
}

/**
 * Composes multiple functions into a single function applying aggregator to each call in the chain.
 *
 * @see {@link compose}
 *
 * @throws {TypeError} "aggregator" must be a function
 * @throws {TypeError} "predicates" must be a list of functions
 *
 * @example
 * ```javascript
 * // Standard invocation
 * aggregate(
 *  (f, ...parameters) => f(...parameters.with(0, parameters.at(0) + 1)),
 *  n => Math.pow(n, 2),
 *  x => x + 1
 * )(4) // => 49
 *
 * // Automatic ArrayLike arguments application
 * aggregate(
 *  (f, ...parameters) => f(...parameters.with(0, parameters.at(0) + 1)),
 *  Math.pow,
 *  x => [x + 1, 2]
 *  )(4) // => 49
 * ```
 */
export var aggregate = (aggregator, ...predicates) => {
  if (!isLike('Function', aggregator)) {
    throw new TypeError('"aggregator" must be a function')
  }

  if (!predicates.every((predicate) => isLike('Function', predicate))) {
    throw new TypeError('"predicates" must be a list of functions')
  }

  return (...parameters) =>
    predicates.reduceRight((parameters, predicate) => {
      if (isLike('Array', parameters)) {
        if (!isLike('Iterable', parameters)) {
          throw new TypeError('"parameters" must have Symbol.iterator')
        }

        return aggregator(predicate, ...parameters)
      }

      return aggregator(predicate, parameters)
    }, parameters)
}

/**
 * Partially applies a function.
 *
 * @throws {TypeError} "predicate" must be a function
 *
 * @example
 * ```javascript
 * let add = (a, b) => a + b
 *
 * partial(add, 1)(2) // => 3
 * ```
 */
export var partial = curry((predicate, ...parameters) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  return predicate.bind(null, ...parameters)
}, 2)

/**
 * Defers the execution of a function.
 *
 * @throws {TypeError} "predicate" must be a function
 *
 * @example
 * ```javascript
 * let add = (a, b) => a + b
 *
 * defer(add, 1, 2)() // => 3
 * ```
 */
export var defer = curry((predicate, ...parameters) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  return () => predicate(...parameters)
}, 2)

/**
 * Invokes a method on an object. At least one argument must be provided.
 *
 * @throws {TypeError} "method" must exist on "object"
 * @throws {TypeError} "method" must be a function
 *
 * @example
 * ```javascript
 * invoke('at', ['a', 'b', 'c'], 1) // => 'b'
 * ```
 */
export var invoke = curry((method, object, ...parameters) => {
  if (!(method in object)) {
    throw new TypeError('"method" must exist on "object"')
  }

  if (!isLike('Function', object[method])) {
    throw new TypeError('"method" must be a function')
  }

  return object[method](...parameters)
})

/**
 * Triggers a method on an object with provided arguments.
 *
 * @see {@link invoke} {@link method}
 *
 * @throws {TypeError} "method" must exist on "object"
 * @throws {TypeError} "method" must be a function
 *
 * @example
 * ```javascript
 * trigger('has', 'status')(new URLSearchParams()) // => false
 * ```
 */
export var trigger = curry(
  (method, ...parameters) =>
    (object) => {
      if (!(method in object)) {
        throw new TypeError('"method" must exist on "object"')
      }

      if (!isLike('Function', object[method])) {
        throw new TypeError('"method" must be a function')
      }

      return object[method](...parameters)
    },
  2
)

/**
 * Invokes a method on an object. No need to provide any arguments as with invoke
 *
 * @see {@link invoke} {@link trigger}
 *
 * @throws {TypeError} "method" must exists on "object"
 * @throws {TypeError} "method" must be a function
 *
 * @example
 * ```javascript
 * method('toUpperCase', 'Hello!') // => 'HELLO!'
 * ```
 */
export var method = curry((method, object, ...parameters) => {
  if (!(method in object)) {
    throw new TypeError('"method" must exists on "object"')
  }

  if (!isLike('Function', object[method])) {
    throw new TypeError('"method" must be a function')
  }

  return object[method](...parameters)
}, 2)

/**
 * Executes a function for its side-effects and returns the original parameter.
 *
 * @throws {TypeError} "predicate" must be a function
 *
 * @example
 * ```javascript
 * effect(console.log, 'Hello') // Logs 'Hello', returns 'Hello'
 * ```
 */
export var effect = curry((predicate, parameter) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  return predicate(parameter), parameter
})

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

/**
 * Gets the value of a property or path from an object.
 *
 * @throws {TypeError} "properties" must be a string or an array of keys
 * @throws {TypeError} Can't act as a path when working with *, provide single key instead
 *
 * @example
 * ```javascript
 * // Standard invocation
 * prop('a', { a: 1 }) // => returns 2
 *
 * // Path-like invocation
 * prop(['a', 'b'], { a: { b: 2 } }) // returns 2
 * ```
 */
export var prop = curry((properties, object) => {
  switch (type(properties)) {
    case 'Array':
      switch (type(object)) {
        case 'Map':
        case 'WeakMap':
        case 'URLSearchParams':
        case 'FormData':
        case 'Headers':
        case 'CSSStyleDeclaration':
        case 'Storage':
        case 'DataTransfer':
          throw new TypeError(
            `Can't act as a path when working with ${type(
              object
            )}, provide single key instead`
          )

        default:
          return properties.reduce(
            (value, property) => value?.[property],
            object
          )
      }

    case 'String':
      switch (type(object)) {
        case 'Map':
        case 'WeakMap':
        case 'URLSearchParams':
        case 'FormData':
        case 'Headers':
          return object.get(properties)

        case 'CSSStyleDeclaration':
          return object.getPropertyValue(properties)

        case 'Storage':
          return object.getItem(properties)

        case 'DataTransfer':
          return object.getData(properties)

        default:
          return object?.[properties]
      }

    default:
      throw new TypeError('"properties" must be a string or an array of keys')
  }
})

/**
 * Gets the values of multiple properties or paths from an object.
 *
 * @throws {TypeError} "properties" must be an array with elements according to the properties of the "prop" function
 *
 * @example
 * ```javascript
 * // Standard invocation
 * props(['a', 'b'], { a: 1, b: { c: 2 } }) // returns [1, { c: 2 }]
 *
 * // Path-like invocation
 * props(['a', ['b', 'c']], { a: 1, b: { c: 2 } }) // returns [1, 2]
 * ```
 */
export var props = curry((properties, object) => {
  if (!isLike('Array', properties))
    throw new TypeError(
      '"properties" must be an ArrayLike with elements according to the properties of the "prop" function'
    )

  return Array.prototype.map.call(properties, (property) => object?.[property])
})

/**
 * Creates a new instance of a constructor.
 *
 * @example
 * ```javascript
 * construct(Date, 2022, 0, 1) // returns Date { ... }
 * ```
 */
export var construct = curry(
  (Constructor, ...parameters) => Reflect.construct(Constructor, parameters),
  2
)

/**
 * Executes one of two functions based on a predicate.
 *
 * @throws {TypeError} "predicate" must be a function
 * @throws {TypeError} "onTrue" must be a function
 * @throws {TypeError} "onFalse" must be a function
 *
 * @example
 * ```javascript
 * // Standard invocation
 * condition(
 *  x => x === true,
 *  x => console.log('True'),
 *  x => console.log('False')
 * )(true) // => Logs 'True'
 * ```
 */
export var condition = curry((predicate, onTrue, onFalse, ...parameters) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  if (!isLike('Function', onTrue)) {
    throw new TypeError('"onTrue" must be a function')
  }

  if (!isLike('Function', onFalse)) {
    throw new TypeError('"onFalse" must be a function')
  }

  return predicate(...parameters)
    ? onTrue(...parameters)
    : onFalse(...parameters)
}, 4)

/**
 * Throws a value as an error.
 *
 * @param {any} value
 *
 * @throws {any} value
 *
 * @example
 * ```javascript
 * raise(new Error('error')) // Throws Error
 * ```
 */
export var raise = (value) => {
  throw value
}

/**
 * Extracts the results of multiple functions applied to provided arguments.
 *
 * @throws {TypeError} "predicates" must be an array of functions
 *
 * @example
 * ```javascript
 * extract(
 *  date => date.getMonth(),
 *  date => date.getDay()
 * )(new Date()) // returns [6, 3]
 * ```
 */
export var extract =
  (...predicates) =>
  (...parameters) => {
    if (!predicates.every((predicate) => isLike('Function', predicate))) {
      throw new TypeError('"predicates" must be an array of functions')
    }

    return predicates.map((predicate) => predicate(...parameters))
  }

/**
 * Aggregates the results of multiple functions.
 *
 * @throws {TypeError} "aggregator" must be a function
 * @throws {TypeError} "predicates" must be an array of functions
 *
 * @example
 * ```javascript
 * use(Math.pow, x => x, x => x + 2)(5, 1) // => 25
 * ```
 */
export var use = (aggregator, ...predicates) => {
  if (!isLike('Function', aggregator)) {
    throw new TypeError('"aggregator" must be a function')
  }

  if (!predicates.every((predicate) => isLike('Function', predicate))) {
    throw new TypeError('"predicates" must be an array of functions')
  }

  return (...parameters) =>
    aggregator(
      ...predicates.map((predicate, index) => predicate(parameters[index]))
    )
}

/**
 * Applies a function to an array of arguments.
 *
 * @throws {TypeError} "predicate" must be a function
 * @throws {TypeError} "parameters" must be an array
 *
 * @example
 * ```javascript
 * apply(Math.max, [1, 2, 3]) // => 3
 * ```
 */
export var apply = curry((predicate, parameters) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  if (!isLike('Array', parameters)) {
    throw new TypeError('"parameters" must be an array')
  }

  if (!isLike('Iterable', parameters)) {
    throw new TypeError('"parameters" must have Symbol.iterator')
  }

  return predicate(...parameters)
})

/**
 * Adds an onfulfilled predicate to a Promise.
 *
 * @throws {TypeError} "predicate" must be a function
 * @throws {TypeError} "thenable" must have method "then"
 * @throws {TypeError} property "then" of "thenable" must be a function
 *
 * @example
 * ```javascript
 * then(console.log, Promise.resolve('Hello!')) // Logs 'Hello!'
 * ```
 */
export var then = curry((predicate, thenable) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  if (!('then' in thenable)) {
    throw new TypeError('"thenable" must have method "then"')
  }

  if (!isLike('Function', thenable.then)) {
    throw new TypeError('property "then" of "thenable" must be a function')
  }

  return thenable.then(predicate)
})

/**
 * Creates an object from keys and values.
 *
 * @throws {TypeError} "keys" must be a string or an array of keys
 *
 * @example
 * ```javascript
 * // Standard invocation
 * objectOf('a', 1) // returns { a: 1 }
 *
 * // Multiple keys invocation
 * objectOf(['a', 'b'], [1, 2]) // => { a: 1, b: 2 }
 * ```
 */
export var objectOf = curry((keys, values) => {
  switch (type(keys)) {
    case 'String':
      return { [keys]: values }

    case 'Array':
      return keys.reduce(
        (object, key, index) => ((object[key] = values[index]), object),
        {}
      )

    default:
      throw new TypeError('"keys" must be a string or an array of keys')
  }
})

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
export var modify = curry((scheme, value) => {
  var result = {}

  for (var key in value) result[key] = scheme[key]?.(value[key]) ?? value[key]

  return result
})

/**
 * Executes a function with a specified argument's length.
 *
 * @throws {TypeError} "predicate" must be a function
 *
 * @example
 * ```javascript
 * unary(parseInt, '42') // => 42
 * ```
 */
export var unary = curry((predicate, ...parameters) => {
  if (!isLike('Function', predicate)) {
    throw new TypeError('"predicate" must be a function')
  }

  return predicate(parameters.at(0))
}, 2)
