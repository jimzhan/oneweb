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
 * Usage: `fsx.dirname(import.meta)`  => 'core'
 *
 * @param {import('node:module').Module} meta
 */
export const dirname = (meta, ...segments) => {
  const here = path.dirname(filename(meta))
  return segments.length > 0 ? path.join(here, ...segments) : here
}
