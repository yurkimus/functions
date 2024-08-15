/**
 * Throws a value as an error.
 *
 * @param {any} value
 *
 * @returns {never}
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
