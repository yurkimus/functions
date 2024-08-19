# Functions

JavaScript-oriented utilities for functional programming.

Functions with arity more than 1 are curried.

## Table of Contents

- [Installation](#installation)
- [Exports](#exports)
  - [aggregate](#aggregate)
  - [apply](#apply)
  - [arity](#arity)
    - [binary](#binary)
    - [unary](#unary)
  - [assign](#assign)
  - [compose](#compose)
  - [condition](#condition)
  - [construct](#construct)
  - [defer](#defer)
  - [effect](#effect)
  - [extract](#extract)
  - [field](#field)
    - [fields](#fields)
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

## Exports

### aggregate

#### Definition

```
aggregate :: function -> [function] -> * -> *
```

#### Example

```javascript
// To do
```

### apply

#### Definition

```
apply :: function -> * -> *
```

#### Example

```javascript
apply(Math.pow, [2, 3]) // => 8
```

### arity

#### Definition

```
arity :: number -> function -> * -> function
```

#### Example

```javascript
arity(1, Math.max, 1, 2, 3) // => 1
```

### binary

#### Definition

```
binary :: function -> * -> function
```

#### Example

```javascript
binary(Math.max, 1, 2, 3) // => 2
```

### unary

#### Definition

```
unary :: function -> * -> function
```

#### Example

```javascript
unary(Math.max, 1, 2, 3) // => 1
```

### identity

#### Definition

```
identity :: * -> *
```

#### Example

```javascript
identity(5) // => 5
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

### partial

#### Definition

```
partial :: function -> * -> *
```

#### Example

```javascript
partial((a, b) => a + b, 2) // => (b) => a + b
```

### defer

#### Definition

```
defer :: function -> * -> function
```

#### Example

```javascript
defer(console.log, '[message]') // => () => console.log('[message]')
```

### invoke

#### Definition

```
invoke :: string -> object -> * -> *
```

#### Example

```javascript
// Arguments are required
invoke('sqrt', Math, 25) // => 5
```

### trigger

#### Definition

```
trigger :: string -> * -> object -> *
```

#### Example

```javascript
// The order is different from when using "invoke", arguments are required
trigger('sqrt', 25)(Math) // => 5
trigger('pow', 2, 5)(Math) // => 32
```

### method

#### Definition

```
method :: string -> object -> * -> *
```

#### Example

```javascript
// Same order as when using "invoke", arguments are optional
method('of', Array) // => []
method('of', Array, 1) // => [1]
```

### assign

#### Definition

```
assign :: * -> * -> object
```

#### Example

```javascript
// Returns the result of the assignment operation, see "effect" to prevent this behaviour
assign('a', 1, {}) // => 1
```

### effect

#### Definition

```
effect :: function -> * -> *
```

#### Example

```javascript
effect(console.log, 5) // => 5
```

### prop

#### Definition

```
prop :: * -> * -> *
```

#### Example

```javascript
prop('key', { key: 1 }) // => 1
prop(['key', 'a'], { key: { a: 1 } }) // => 1
```

### props

#### Definition

```
props :: * -> * -> *
```

#### Example

```javascript
props(['key'], { key: 1 }) // => [1]
props(['a', ['key', 'b']], { a: 0, key: { b: 1 } }) // => [0,1]
```

### field

#### Definition

```
field :: * -> * -> *
```

#### Example

```javascript
field('key', new URLSearchParams([['key', 1]])) // => 1
field('key', new Map([['key', 1]])) // => 1
```

### fields

#### Definition

```
fields :: * -> * -> *
```

#### Example

```javascript
fields(['a', 'key'], new URLSearchParams([['a', 0], ['key', 1]])) // => [0,1]
fields(['key'], new Map([['key', 1]])) // => [1]
```

### construct

#### Definition

```
construct :: function -> * -> *
```

#### Example

```javascript
construct(URLSearchParams, [['x', 1], ['y', 2]]) // => URLSearchParams { size: 2 }
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

### raise

#### Definition

```
raise :: * -> throws
```

#### Example

```javascript
raise('Message') // => throws 'Message'
```

### satisfies

#### Definition

```
satisfies :: function -> * -> boolean
```

#### Example

```javascript
satisfies((n) => n == 0, 0) // => true
```

### extract

#### Definition

```
extract :: function -> * -> *
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

#### Example

```javascript
use(
  Math.pow,
  (n) => n + 2,
  (n) => n + 3,
)(0, 0) // => 8
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

### objectOf

#### Definition

```
objectOf :: * -> * -> object
```

#### Example

```javascript
objectOf('n', 0) // => { n: 0 }

objectOf(['a', 'b'], [0, 1]) // => { a: 0, b: 1 }
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

### unless

#### Definition

```
unless :: function -> function -> * -> *
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
use :: function -> function -> *
```

#### Example

```javascript
// To do
```

### when

#### Definition

```
when :: function -> function -> * -> *
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
