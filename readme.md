# Functions

A collection of functional programming utilities for JavaScript.

### type

Gets the type of a value as a string.

| Parameter | Type | Description                  |
| --------- | ---- | ---------------------------- |
| value     | any  | Any value to get the type of |

Example:

```javascript
type('Hello!') // returns 'String'
type(async () => {}) // returns 'AsyncFunction'
type(new URLSearchParams()) // returns 'URLSearchParams'
```

### identity

Returns the same value.

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| value     | `any` | Any value   |

```javascript
identity(42) // returns 42
```

### curry

Returns a curried version of a function.

| Parameter | Type       | Description                  |
| --------- | ---------- | ---------------------------- |
| predicate | `Function` | Function to be curried       |
| length    | `[number]` | Optional number of arguments |

Example:

```javascript
curry((a, b) => a + b)(1)(2) // returns 3
```

### compose

Composes multiple functions into a single function.

| Param      | Type         | Description          |
| ---------- | ------------ | -------------------- |
| predicates | `Function[]` | Functions to compose |

Example:

```javascript
// Standard invocation
compose(
  (n) => Math.pow(n, 2),
  (n) => n + 1
)(5) // returns 25

// Automatic array arguments application
compose(Math.pow, (n) => [n + 1, 2])(4) // returns 25
```

### aggregate

Composes multiple functions into a single function applying aggregator to each call in the chain.

| Param      | Type         | Description                   |
| ---------- | ------------ | ----------------------------- |
| aggregator | `Function`   | Function to aggregate results |
| predicates | `Function[]` | Functions to apply            |

Example:

```javascript
// Standard invocation
aggregate(
  (f, ...parameters) => f(...parameters.with(0, parameters.at(0) + 1)),
  (n) => Math.pow(n, 2),
  (x) => x + 1
)(4) // returns 49

// Automatic array arguments application
aggregate(
  (f, ...parameters) => f(...parameters.with(0, parameters.at(0) + 1)),
  Math.pow,
  (x) => [x + 1, 2]
)(4) // returns 49
```

### partial

Partially applies a function.

| Param      | Type       | Description                   |
| ---------- | ---------- | ----------------------------- |
| predicate  | `Function` | Function to partially apply   |
| parameters | `any[]`    | Parameters to partially apply |

Example:

```javascript
let add = (a, b) => a + b

partial(add, 1)(2) // returns 3
```

### defer

Defers the execution of a function.

| Param      | Type       | Description         |
| ---------- | ---------- | ------------------- |
| predicate  | `Function` | Function to defer   |
| parameters | `any[]`    | Parameters to defer |

Example:

```javascript
let add = (a, b) => a + b

defer(add, 1, 2)() // => returns 3
```

### invoke

Invokes a method on an object.

> [!NOTE]
> At least one argument must be provided.

| Param      | Type     | Description                      |
| ---------- | -------- | -------------------------------- |
| method     | `string` | Method name                      |
| object     | `object` | Object containing the method     |
| parameters | `any[]`  | Parameters to pass to the method |

Example:

```javascript
invoke('at', ['a', 'b', 'c'], 1) // returns 'b'
```

### method

Invokes a method on an object.

> [!NOTE]
> No need to provide any arguments as with invoke.

| Param      | Type     | Description                      |
| ---------- | -------- | -------------------------------- |
| method     | `string` | Method name                      |
| object     | `object` | Object containing the method     |
| parameters | `any[]`  | Parameters to pass to the method |

Example:

```javascript
method('toUpperCase', 'Hello!') // returns 'HELLO!'
```

### effect

Executes a function for its side-effects and returns the original parameter.

| Param     | Type       | Description                   |
| --------- | ---------- | ----------------------------- |
| predicate | `Function` | Function to execute           |
| parameter | `any`      | Parameter to pass to function |

Example:

```javascript
effect(console.log, 'Hello') // Logs 'Hello', returns 'Hello'
```

### assign

Assigns a property to an object.

| Param    | Type     | Description      |
| -------- | -------- | ---------------- |
| property | `string` | Property name    |
| value    | `any`    | Value to assign  |
| object   | `object` | Object to modify |

Example:

```javascript
assign('a', 1, { b: 2 }) // returns 1
```

### prop

Gets the value of a property or path from an object.

| Param      | Type                   | Description                |
| ---------- | ---------------------- | -------------------------- |
| properties | `string` or `string[]` | Property name(s) to access |
| object     | `object`               | Object to query            |

Example:

```javascript
// Standard invocation
prop('a', { a: 1 }) // => returns 2

// Path-like invocation
prop(['a', 'b'], { a: { b: 2 } }) // returns 2
```

### props

Gets the values of multiple properties or paths from an object.

| Param      | Type                     | Description             |
| ---------- | ------------------------ | ----------------------- |
| properties | `(string or string[])[]` | Array of property names |
| object     | `object`                 | Object to query         |

Example:

```javascript
// Standard invocation
props(['a', 'b'], { a: 1, b: { c: 2 } }) // returns [1, { c: 2 }]

// Path-like invocation
props(['a', ['b', 'c']], { a: 1, b: { c: 2 } }) // returns [1, 2]
```

### construct

Creates a new instance of a constructor.

| Param       | Type       | Description                          |
| ----------- | ---------- | ------------------------------------ |
| Constructor | `Function` | Constructor function                 |
| parameters  | `any[]`    | Arguments to pass to the constructor |

Example:

```javascript
construct(Date, 2022, 0, 1) // returns Date { ... }
```

### condition

Executes one of two functions based on a predicate.

| Param      | Type       | Description                     |
| ---------- | ---------- | ------------------------------- |
| predicate  | `Function` | Function to evaluate            |
| onTrue     | `Function` | Function to execute if true     |
| onFalse    | `Function` | Function to execute if false    |
| parameters | `any[]`    | Parameters to pass to functions |

Example:

```javascript
// Standard invocation
condition(
  (x) => x === true,
  (x) => {
    console.log('True')
    return x
  },
  (x) => console.log('False')
)(true) // => Logs 'True', returns true
```

### raise

Throws a value as an error.

| Param | Type  | Description             |
| ----- | ----- | ----------------------- |
| value | `any` | Value to throw as error |

Example:

```javascript
raise(new Error('error')) // Throws Error
```

### extract

Extracts the results of multiple functions applied to provided arguments.

| Param      | Type         | Description                     |
| ---------- | ------------ | ------------------------------- |
| predicates | `Function[]` | Functions to execute            |
| parameters | `any[]`      | Parameters to pass to functions |

Example:

```javascript
extract(
  (date) => date.getMonth(),
  (date) => date.getDay()
)(new Date()) // returns [6, 3]
```

### use

Aggregates the results of multiple functions.

| Param      | Type         | Description                   |
| ---------- | ------------ | ----------------------------- |
| aggregator | `Function`   | Function to aggregate results |
| predicates | `Function[]` | Functions to apply            |

Example:

```javascript
use(
  Math.pow,
  (x) => x,
  (x) => x + 2
)(5, 1) // returns 25
```

### apply

Applies a function to an array of arguments.

| Param      | Type       | Description                |
| ---------- | ---------- | -------------------------- |
| predicate  | `Function` | Function to apply          |
| parameters | `any[]`    | Array of arguments to pass |

Example:

```javascript
apply(Math.max, [1, 2, 3]) // returns 3
```

### then

Adds an onfulfilled predicate to a Promise.

| Param     | Type       | Description                            |
| --------- | ---------- | -------------------------------------- |
| predicate | `Function` | Function to call when promise resolves |
| thenable  | `object`   | Promise-like object with `then` method |

Example:

```javascript
then(console.log, Promise.resolve('Hello!')) // Logs 'Hello!'
```

### objectOf

Creates an object from keys and values.

| Param  | Type                   | Description                  |
| ------ | ---------------------- | ---------------------------- |
| keys   | `string` or `string[]` | Keys for the object          |
| values | `any`                  | Values to assign to the keys |

Example:

```javascript
// Standard invocation
objectOf('a', 1) // returns { a: 1 }

// Multiple keys invocation
objectOf(['a', 'b'], [1, 2]) // { a: 1, b: 2 }
```

### modify

Modifies an object based on a scheme.

| Param  | Type     | Description                 |
| ------ | -------- | --------------------------- |
| scheme | `object` | Scheme to modify the object |
| value  | `object` | Object to modify            |

Example:

```javascript
modify({ a: (x) => x + 1 }, { a: 1, b: 2 }) // returns { a: 2, b: 2 }
```

### unary

Executes a function with a specified argument's length.

| Param      | Type       | Description                      |
| ---------- | ---------- | -------------------------------- |
| predicate  | `Function` | Function to execute              |
| parameters | `any[]`    | Single argument for the function |

Example:

```javascript
unary(parseInt, '42') // returns 42
```
