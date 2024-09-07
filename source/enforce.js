import { curry } from '@yurkimus/curry'

/**
 * Enforces "predicate" to return "value"
 *
 * @definition
 * ```
 * enforce<Predicate, Value> :: (predicate: Predicate) -> (value: Value) -> (...parameters: Parameters<Predicate>) -> Value
 * ```
 */
export var enforce = curry(
  (predicate, value, ...parameters) => (predicate(...parameters), value),
  3
)
