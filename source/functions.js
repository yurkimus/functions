/**
 * Gets the type of a value as a string.
 *
 * @returns {string}
 *
 * @example
 *  type('Hello!') // returns 'String'
 *  type(async () => {}) // returns 'AsyncFunction'
 *  type(new URLSearchParams()) // returns 'URLSearchParams'
 */
export var type = (value) => Object.prototype.toString.call(value).slice(8, -1)

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
 *  identity(42) // returns 42
 */
export var identity = (value) => value

/**
 * Returns a curried version of a function.
 *
 * @throws {TypeError} 'predicate' must be a function
 *
 * @example
 *  curry((a, b) => a + b)(1)(2) // returns 3
 */
export var curry = (predicate, length = predicate.length) => {
  if (!type(predicate).includes('Function')) {
    throw new TypeError('"predicate" must be a function')
  }

  return (...parameters) =>
    parameters.length >= length
      ? predicate(...parameters)
      : curry(predicate.bind(null, ...parameters), length - parameters.length)
}

/**
 * Composes multiple functions into a single function.
 *
 * @throws {TypeError} 'predicates' must be an array of functions
 *
 * @example
 *  // Standard invocation
 *  compose(n => Math.pow(n, 2), n => n + 1)(5) // returns 25
 *
 *  // Automatic array arguments application
 *  compose(Math.pow, n => [n + 1, 2])(4) // returns 25
 */
export var compose = (...predicates) => {
  if (!predicates.every((predicate) => type(predicate).includes('Function'))) {
    throw new TypeError('"predicates" must be an array of functions')
  }

  return (...parameters) =>
    predicates.reduceRight(
      (parameters, predicate) =>
        Array.isArray(parameters)
          ? predicate(...parameters)
          : predicate(parameters),
      parameters
    )
}

/**
 * Composes multiple functions into a single function applying aggregator to each call in the chain.
 *
 * @see {@link compose}
 *
 * @throws {TypeError} 'aggregator' must be a function
 * @throws {TypeError} 'predicates' must be an array of functions
 *
 * @example
 *  // Standard invocation
 *  aggregate(
 *    (f, ...parameters) => f(...parameters.with(0, parameters.at(0) + 1)),
 *    n => Math.pow(n, 2),
 *    x => x + 1
 *  )(4) // returns 49
 *
 *  // Automatic array arguments application
 *  aggregate(
 *    (f, ...parameters) => f(...parameters.with(0, parameters.at(0) + 1)),
 *    Math.pow,
 *    x => [x + 1, 2]
 *  )(4) // returns 49
 */
export var aggregate = (aggregator, ...predicates) => {
  if (!type(aggregator).includes('Function')) {
    throw new TypeError('"aggregator" must be a function')
  }

  if (!predicates.every((predicate) => type(predicate).includes('Function'))) {
    throw new TypeError('"predicates" must be an array of functions')
  }

  return (...parameters) =>
    predicates.reduceRight(
      (parameters, predicate) =>
        Array.isArray(parameters)
          ? aggregator(predicate, ...parameters)
          : aggregator(predicate, parameters),
      parameters
    )
}

/**
 * Partially applies a function.
 *
 * @throws {TypeError} 'predicate' must be a function
 *
 * @example
 *  let add = (a, b) => a + b
 *
 *  partial(add, 1)(2) // returns 3
 */
export var partial = curry((predicate, ...parameters) => {
  if (!type(predicate).includes('Function')) {
    throw new TypeError('"predicate" must be a function')
  }

  return predicate.bind(null, ...parameters)
}, 2)

/**
 * Defers the execution of a function.
 *
 * @throws {TypeError} 'predicate' must be a function
 *
 * @example
 *  let add = (a, b) => a + b
 *
 *  defer(add, 1, 2)() // => returns 3
 */
export var defer = curry((predicate, ...parameters) => {
  if (!type(predicate).includes('Function')) {
    throw new TypeError('"predicate" must be a function')
  }

  return () => predicate(...parameters)
}, 2)

/**
 * Invokes a method on an object. At least one argument must be provided.
 *
 * @throws {TypeError} 'method' must exists on 'object'
 * @throws {TypeError} 'method' must be a Function
 *
 * @example
 *  invoke('at', ['a', 'b', 'c'], 1) // returns 'b'
 */
export var invoke = curry((method, object, ...parameters) => {
  if (!(method in object)) {
    throw new TypeError('"method" must exists on "object"!')
  }

  if (!type(object[method]).includes('Function')) {
    throw new TypeError('"method" must be a Function')
  }

  return object[method](...parameters)
})

/**
 * Invokes a method on an object. No need to provide any arguments as with invoke
 *
 * @see {@link invoke}
 *
 * @throws {TypeError} 'method' must exists on 'object'
 * @throws {TypeError} 'method' must be a Function
 *
 * @example
 *  method('toUpperCase', 'Hello!') // returns 'HELLO!'
 */
export var method = curry((method, object, ...parameters) => {
  if (!(method in object)) {
    throw new TypeError('"method" must exists on "object"')
  }

  if (!type(object[method]).includes('Function')) {
    throw new TypeError('"method" must be a Function')
  }

  return object[method](...parameters)
}, 2)

/**
 * Executes a function for its side-effects and returns the original parameter.
 *
 * @throws {TypeError} 'predicate' must be a Function
 *
 * @example
 *  effect(console.log, 'Hello') // Logs 'Hello', returns 'Hello'
 */
export var effect = curry((predicate, parameter) => {
  if (!type(predicate).includes('Function')) {
    throw new TypeError('"predicate" must be a Function')
  }

  return predicate(parameter), parameter
})

/**
 * Assigns a property to an object.
 *
 * @throws {TypeError} 'object' must be assignable
 *
 * @example
 *  assign('a', 1, { b: 2 }) // returns 1
 */
export var assign = curry((property, value, object) => {
  if (type(object) == 'Null' || type(object) == 'Undefined') {
    throw new TypeError('"object" must be assignable')
  }

  return (object[property] = value)
})

/**
 * Gets the value of a property or path from an object.
 *
 * @throws {TypeError} 'properties' must be a USVString or sequence<USVString>
 *
 * @example
 *  // Standard invocation
 *  prop('a', { a: 1 }) // => returns 2
 *
 *  // Path-like invocation
 *  prop(['a', 'b'], { a: { b: 2 } }) // returns 2
 */
export var prop = curry((properties, object) => {
  if (
    !['Array', 'Symbol', 'String', 'Number', 'Boolean'].some(
      (value) => type(properties) == value
    )
  ) {
    throw new TypeError(
      '"properties" must be a USVString or sequence<USVString>'
    )
  }

  return Array.isArray(properties)
    ? properties.reduce((value, property) => value?.[property], object)
    : object?.[properties]
})

/**
 * Gets the values of multiple properties or paths from an object.
 *
 * @throws {TypeError} 'properties' must be a string array
 *
 * @example
 *  // Standard invocation
 *  props(['a', 'b'], { a: 1, b: { c: 2 } }) // returns [1, { c: 2 }]
 *
 * // Path-like invocation
 *  props(['a', ['b', 'c']], { a: 1, b: { c: 2 } }) // returns [1, 2]
 */
export var props = curry((properties, object) => {
  if (!(type(properties) == 'Array')) {
    throw new TypeError('"properties" must be a string array')
  }

  return properties.map((property) => prop(property, object))
})

/**
 * Creates a new instance of a constructor.
 *
 * @example
 *  construct(Date, 2022, 0, 1) // returns Date instance
 */
export var construct = curry(
  (Constructor, ...parameters) => Reflect.construct(Constructor, parameters),
  2
)

/**
 * Executes one of two functions based on a predicate.
 *
 * @throws {TypeError} 'predicate' must be a Function
 * @throws {TypeError} 'onTrue' must be a Function
 * @throws {TypeError} 'onFalse' must be a Function
 *
 * @example
 *  // Standard invocation
 *  condition(
 *    x => x === true,
 *    x => console.log('True'),
 *    x => console.log('False')
 *  )(true) // => Logs 'True'
 */
export var condition = curry((predicate, onTrue, onFalse, ...parameters) => {
  if (!type(predicate).includes('Function')) {
    throw new TypeError('"predicate" must be a Function')
  }

  if (!type(onTrue).includes('Function')) {
    throw new TypeError('"onTrue" must be a Function')
  }

  if (!type(onFalse).includes('Function')) {
    throw new TypeError('"onFalse" must be a Function')
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
 *  raise(new Error('error')) // Throws Error
 */
export var raise = (value) => {
  throw value
}

/**
 * Extracts the results of multiple functions applied to provided arguments.
 *
 * @throws {TypeError} 'predicates' must be an array of functions
 *
 * @example
 *  extract(
 *    date => date.getMonth(),
 *    date => date.getDay()
 *  )(new Date()) // returns [6, 3]
 */
export var extract =
  (...predicates) =>
  (...parameters) => {
    if (
      !predicates.every((predicate) => type(predicate).includes('Function'))
    ) {
      throw new TypeError('"predicates" must be an array of functions')
    }

    return predicates.map((predicate) => predicate(...parameters))
  }

/**
 * Aggregates the results of multiple functions.
 *
 * @throws {TypeError} 'aggregator' must be a Function
 * @throws {TypeError} 'predicates' must be an array of functions
 *
 * @example
 *  use(Math.pow, x => x, x => x + 2)(5, 1) // returns 25
 */
export var use = (aggregator, ...predicates) => {
  if (!type(aggregator).includes('Function')) {
    throw new TypeError('"aggregator" must be a Function')
  }

  if (!predicates.every((predicate) => type(predicate).includes('Function'))) {
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
 * @throws {TypeError} 'predicate' must be a Function
 * @throws {TypeError} 'parameters' must be an array
 *
 * @example
 *  apply(Math.max, [1, 2, 3]) // returns 3
 */
export var apply = curry((predicate, parameters) => {
  if (!type(predicate).includes('Function')) {
    throw new TypeError('"predicate" must be a Function')
  }

  if (!(type(parameters) == 'Array')) {
    throw new TypeError('"parameters" must be an array')
  }

  return predicate(...parameters)
})

/**
 * Adds an onfulfilled predicate to a Promise.
 *
 * @throws {TypeError} 'predicate' must be a Function
 * @throws {TypeError} 'thenable' must have method 'then'
 *
 * @example
 *  then(console.log, Promise.resolve('Hello!')) // Logs 'Hello!'
 */
export var then = curry((predicate, thenable) => {
  if (!type(predicate).includes('Function')) {
    throw new TypeError('"predicate" must be a Function')
  }

  if (!('then' in thenable)) {
    throw new TypeError('"thenable" must have method "then"')
  }

  if (!type(thenable.then).includes('Function')) {
    throw new TypeError('property "then" of "thenable" must be a Function')
  }

  return thenable.then(predicate)
})

/**
 * Creates an object from keys and values.
 *
 * @throws {TypeError} 'keys' must be a string or an array of string
 *
 * @example
 *  // Standard invocation
 *  objectOf('a', 1) // returns { a: 1 }
 *
 *  // Multiple keys invocation
 *  objectOf(['a', 'b'], [1, 2]) // { a: 1, b: 2 }
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
      throw new TypeError('"keys" must be a string or an array of string')
  }
})

/**
 * Modifies an object based on a scheme.
 *
 * @example
 *  modify(
 *    { a: x => x + 1 },
 *    { a: 1, b: 2 }
 *  ) // returns { a: 2, b: 2 }
 */
export var modify = curry((scheme, value) => {
  var result = {}

  for (var key in value) result[key] = scheme[key]?.(value[key]) ?? value[key]

  return result
})

/**
 * Executes a function with a specified argument's length.
 *
 * @example
 *  unary(parseInt, '42') // returns 42
 */
export var unary = curry(
  (predicate, ...parameters) => predicate(parameters.at(0)),
  2
)
