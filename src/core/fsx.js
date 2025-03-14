import url from 'node:url'
import path from 'node:path'

// drop-in replacement for `__filename`, `__dirname` and `require` in commonjs.

/**
 * Usage: `fsx.filename(import.meta)`  => 'fsx.js'
 *
 * @param {import('node:module').Module} meta
 */
export const filename = (meta) => url.fileURLToPath(meta.url)

/**
 * Usage:
 *    - `fsx.join(import.meta)`  => 'core'  - here like `__dirname`
 *    - `fsx.join(import.meta, '..', '..')`  => project root.
 *    - `fsx.join(import.meta, '..', '..', 'package.json')`.
 *
 * @param {import('node:module').Module} meta
 * @param {...string} segments - path segments
 */
export const join = (meta, ...segments) => {
  const here = path.dirname(filename(meta))
  return segments.length > 0 ? path.join(here, ...segments) : here
}
