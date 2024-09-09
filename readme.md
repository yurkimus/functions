# Functions

JavaScript-oriented utilities for functional programming.

Functions with arity more than 1 are curried.

## Table of Contents

- [Installation](#installation)
- [Requirements](#requirements)
- [Exports](#exports)
  - [aggregate](#aggregate)
  - [apply](#apply)
  - [applyTo](#applyTo)
  - [arity](#arity)
    - [unary](#unary)
    - [binary](#binary)
  - [assign](#assign)
  - [compose](#compose)
  - [condition](#condition)
  - [construct](#construct)
  - [defer](#defer)
  - [effect](#effect)
  - [enforce](#enforce)
  - [extract](#extract)
  - [field](#field)
    - [fields](#fields)
  - [hasField](#hasField)
  - [hasProp](#hasProp)
  - [identity](#identity)
  - [invoke](#invoke)
  - [method](#method)
  - [modify](#modify)
  - [objectOf](#objectOf)
  - [partial](#partial)
  - [prop](#prop)
    - [props](#props)
  - [raise](#raise)
  - [satisfies](#satisfies)
  - [then](#then)
  - [trigger](#trigger)
  - [unless](#unless)
  - [use](#use)
  - [when](#when)
- [License](#license)

## Installation

### npm

```
npm install @yurkimus/functions
```

### urls

```
"@yurkimus/functions": "npm:@yurkimus/functions"
```

```
"@yurkimus/functions": "github:yurkimus/functions"
```

```
"@yurkimus/functions": "https://raw.githubusercontent.com/yurkimus/functions/main/source/index.js"
```

## Requirements

Modules:

- [Module | @yurkimus/curry](https://github.com/yurkimus/curry)
- [Module | @yurkimus/types](https://github.com/yurkimus/types)

Runtime:

- [Array.prototype.at](https://262.ecma-international.org/15.0/index.html#sec-array.prototype.at)
- [Array.prototype.every](https://262.ecma-international.org/15.0/index.html#sec-array.prototype.every)
- [Array.prototype.includes](https://262.ecma-international.org/15.0/index.html#sec-array.prototype.includes)
- [Array.prototype.reduce](https://262.ecma-international.org/15.0/index.html#sec-array.prototype.reduce)
- [Array.prototype.reduceRight](https://262.ecma-international.org/15.0/index.html#sec-array.prototype.reduceright)
- [Array.prototype.slice](https://262.ecma-international.org/15.0/index.html#sec-array.prototype.slice)
- [Array.prototype.[@@iterator]](https://262.ecma-international.org/15.0/index.html#sec-array.prototype-@@iterator)
- [Function.prototype.bind](https://262.ecma-international.org/15.0/index.html#sec-function.prototype.bind)
- [Object.hasOwn](https://262.ecma-international.org/15.0/index.html#sec-object.hasown)
- [Reflect.construct](https://262.ecma-international.org/15.0/index.html#sec-reflect.construct)
- [Optional chains (?.)](https://262.ecma-international.org/15.0/index.html#sec-optional-chains)

## Exports

### aggregate

#### Definition

```
aggregate :: function -> ...function -> ...parameters -> *
```

#### Example

```javascript
// To do
```

### apply

#### Definition

```
apply :: function -> parameters -> *
```

#### Example

```javascript
apply(Math.pow, [2, 3]) // => 8
```

### applyTo

#### Definition

```
applyTo :: parameters -> function -> *
```

#### Example

```javascript
applyTo([2, 3], Math.pow) // => 8
```

### arity

#### Definition

```
arity :: number -> function -> ...parameters -> *
```

#### Example

```javascript
arity(1, Math.max, 1, 2, 3) // => 1
```

### unary

#### Definition

```
unary :: function -> ...parameters -> *
```

#### Example

```javascript
unary(Math.max, 1, 2, 3) // => 1
```

### binary

#### Definition

```
binary :: function -> ...parameters -> *
```

#### Example

```javascript
binary(Math.max, 1, 2, 3) // => 2
```

### assign

#### Definition

```
assign :: string -> parameter -> object
```

#### Example

```javascript
// Returns the result of the assignment operation, see "effect" to prevent this behaviour
assign('a', 1, {}) // => 1
```

### compose

#### Definition

```
compose :: ...function -> ...parameters -> *
```

#### Example

```javascript
compose(Math.sqrt, Math.abs)(-25) // => 5
```

### condition

#### Definition

```
condition :: function -> function -> function -> *
```

#### Example

```javascript
condition(
  (array) => array.length > 0,
  () => true,
  () => false,
  [],
) // => false
```

### construct

#### Definition

```
construct :: function -> ...parameters -> *
```

#### Example

```javascript
construct(URLSearchParams, [['x', 1], ['y', 2]]) // => URLSearchParams { size: 2 }
```

### defer

#### Definition

```
defer :: function -> ...parameters -> (() -> *)
```

#### Example

```javascript
defer(console.log, '[message]') // => () => console.log('[message]')
```

### effect

#### Definition

```
effect :: function -> parameter -> parameter
```

#### Example

```javascript
effect(console.log, 5) // => 5
```

### enforce

#### Definition

```
enforce :: function -> parameter -> ...parameters -> parameter
```

#### Example

```javascript
enforce(console.log, true, 'a') // => Logs 'a', returns true
```

### extract

#### Definition

```
extract :: ...function -> ...parameters -> *
```

#### Example

```javascript
extract(
  field('search'),
  field('limit'),
)(
  new URLSearchParams([
    ['search', 'todo'],
    ['limit', 10],
  ]),
) // => ['todo', '10']
```

### field

#### Definition

```
field :: string -> * -> *
```

#### Example

```javascript
field('key', new URLSearchParams([['key', 1]])) // => 1
field('key', new Map([['key', 1]])) // => 1
// When working with 'Object' type, the function uses `Object.hasOwn` to check if the object has it's own proeprty. To access properties through the prototype chain as well, you can use `prop` function
field('toString', {}) // => false
```

### fields

#### Definition

```
fields :: string[] -> * -> *
```

#### Example

```javascript
fields(['a', 'key'], new URLSearchParams([['a', 0], ['key', 1]])) // => [0,1]
fields(['key'], new Map([['key', 1]])) // => [1]
```

### hasField

#### Definition

```
hasField :: string -> * -> boolean
hasField :: string[] -> * -> boolean
```

#### Example

```javascript
hasField('key', new URLSearchParams([['key', 1]])) // => true
hasField('key', new Map([['key', 1]])) // => true
```

### hasProp

#### Definition

```
hasProp :: string -> * -> boolean
hasProp :: string[] -> * -> boolean
```

#### Example

```javascript
hasProp('size', new Map([['key', 1]])) // => true
hasProp('key', new Map([['key', 1]])) // => false
```

### identity

#### Definition

```
identity :: parameter -> parameter
```

#### Example

```javascript
identity(5) // => 5
```

### invoke

#### Definition

```
invoke :: string -> object -> ...parameters -> *
```

#### Example

```javascript
// Arguments are required
invoke('sqrt', Math, 25) // => 5
```

### method

#### Definition

```
method :: string -> object -> ...parameters -> *
```

#### Example

```javascript
// Same order as when using "invoke", arguments are optional
method('of', Array) // => []
method('of', Array, 1) // => [1]
```

### modify

#### Definition

```
modify :: object -> * -> *
```

#### Example

```javascript
modify({
  key: 'a',
  length: (n) => n + 5,
}, {
  key: 'a',
  length: 0,
}) // => { key: 'a', length: 5 }
```

### objectOf

#### Definition

```
objectOf :: string -> parameter -> object
objectOf :: string[] -> parameter[] -> object
```

#### Example

```javascript
objectOf('n', 0) // => { n: 0 }

objectOf(['a', 'b'], [0, 1]) // => { a: 0, b: 1 }
```

### partial

#### Definition

```
partial :: function -> ...parameters -> *
```

#### Example

```javascript
partial((a, b) => a + b, 2) // => (b) => a + b
```

### prop

#### Definition

```
prop :: string -> * -> *
prop :: string[] -> * -> *
```

#### Example

```javascript
prop('key', { key: 1 }) // => 1
prop(['key', 'a'], { key: { a: 1 } }) // => 1
```

### props

#### Definition

```
props :: string[] -> * -> *
props :: string[][] -> * -> *
```

#### Example

```javascript
props(['key'], { key: 1 }) // => [1]
props(['a', ['key', 'b']], { a: 0, key: { b: 1 } }) // => [0,1]
```

### raise

#### Definition

```
raise :: * -> ThrowCompletion
```

[ECMA 6.2.4.2 | ThrowCompletion](https://262.ecma-international.org/15.0/index.html#sec-throwcompletion)

#### Example

```javascript
raise('Message') // => throws 'Message'
```

### satisfies

#### Definition

```
satisfies :: function -> ...parameters -> boolean
```

#### Example

```javascript
satisfies((n) => n == 0, 0) // => true
```

### then

#### Definition

```
then :: function -> PromiseLike -> PromiseLike
```

#### Example

```javascript
then((n) => n + 5, Promise.resolve(0)) // => Promise { 5 }
```

### trigger

#### Definition

```
trigger :: string -> ...parameters -> object -> *
```

#### Example

```javascript
// The order is different from when using "invoke", arguments are required
trigger('sqrt', 25)(Math) // => 5
trigger('pow', 2, 5)(Math) // => 32
```

### unless

#### Definition

```
unless :: function -> function -> ...parameters -> *
```

#### Example

```javascript
unless(
  (n) => n == 0,
  console.log.bind(console, 'not equals 0, value: '),
  1,
) // => logs 'not equals 0, value: 1'
```

### use

#### Definition

```
use :: function -> ...function -> ...parameters -> *
```

#### Example

```javascript
use(
  Math.pow,
  (n) => n + 2,
  (n) => n + 3,
)(0, 0) // => 8
```

### when

#### Definition

```
when :: function -> function -> ...parameters -> *
```

#### Example

```javascript
when(
  (n) => n == 0,
  console.log.bind(console, 'equals 0, value: '),
  0,
) // => logs 'equals 0, value: 0'
```

## License

[MIT](LICENSE)
