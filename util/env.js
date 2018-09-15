/**
 * Returns the current environment name, based from `process.env.NODE_ENV`.
 * Defaults to `development` if not defined.
 *
 * @returns {string} The current environment name
 */
function getEnv() {
  return process.env.NODE_ENV || 'development'
}
exports.getEnv = getEnv

/**
 * Whether the current environment is development environment.
 *
 * @returns {boolean} True if in development, false otherwise.
 */
function getDev() {
  return getEnv() === 'development'
}
exports.getDev = getDev

/**
 * Whether the current environment is production environment.
 *
 * @returns {boolean} True if in production, false otherwise.
 */
function getProduction() {
  return getEnv() === 'production'
}
exports.getProduction = getProduction
