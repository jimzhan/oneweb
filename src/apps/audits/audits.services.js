import assert from 'node:assert'
import DeepDiff from 'deep-diff'
import { Audit } from './audits.models.js'

/**
 * Capture changes between 2 given values. Format of `audits.changes
 *   @SEEALSO (Deep Diff)[https://www.npmjs.com/package/deep-diff].
 *
 * @param {string} type - Platform-wide audit type constants.
 * @param {string} source - The ID of the record was affected.
 * @param {Array} values - List of values changed from point `a` to `b`.
 * @param {string} changedBy - User id of the person who updated the object.
 * @param {object} metadata - Extra data checkpoints required.
 *
 * @throw {Error} if the 2 given values do not have the same ID.
 * @throw {Error} if the payload is invalid.
 */
export const log = async ({ type, source, values, changedBy, metadata = {} }) => {
  // Ensure 2 values have the same ID so that we not not comparing 2 distinct objects.
  assert(values.length === 2, 'changes can be captured between 2 objects only')
  const changes = DeepDiff(...values, (_, key) => key === 'id')
  const payload = { type, source, changes, changedBy, metadata }
  // @TODO Joi validation.
  const audit = await Audit.query().insert(payload)
  return audit
}
