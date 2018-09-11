const crypto = require('crypto')
const cookieSession = require('cookie-session')
const {getProduction} = require('../lib/env')

/**
 * This mod adds cookie-based session to app.
 *
 * Note that `SESSION_KEYS` environment variable **should** be provided.
 * If `SESSION_KEYS` is not provided, a random string will be generated;
 * however, all client session cookies will be invalidated when the app
 * restarts. To provide multiple secret in `SESSION_KEYS`, split it with
 * semicolon (`;`) e.g. `'abc;123;456'`.
 *
 * `secure` is enabled if `trust proxy` app settings table is set to truthy.
 * Otherwise, `secure` is enabled only in production.
 *
 * Docs: https://www.npmjs.com/package/cookie-session
 *
 * @param {Express.Application} app Express app to be modded
 */
function modCookieSession(app) {
  app.use(cookieSession({
    keys: (process.env.SESSION_KEYS || createRandomString(18)).split(';'),
    secure: Boolean(app.get('trust proxy')) || getProduction()
  }))
}

module.exports = modCookieSession

/**
 * Helper function to generate a random string with `length` characters.
 *
 * Note that the length of generated string is always even and less than
 * or equal to `length`.
 *
 * @param {number} length Length of the string to be created
 * @returns {string} A random hex string as described
 */
function createRandomString(length) {
  return crypto.randomBytes(length / 2).toString('hex')
}
