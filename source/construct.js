import { curry } from '@yurkimus/curry'

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
  2,
)
