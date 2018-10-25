const cookieSession = require('cookie-session')
const {getProduction} = require('../util/env')
const randomString = require('../util/random-string')

/**
 * This mod adds cookie-based session provider middleware to app.
 *
 * `secure` is enabled if `trust proxy` app settings table is truthy or in
 * production.
 *
 * Environment variables:
 *   - **SESSION_KEYS**: secret string(s) for cookie-session to encrypt the
 *     cookies (default: none). To provide multiple keys, use a semicolon
 *     between each strings, e.g. `abc;123;456`.
 *
 * If SESSION_KEYS is not provide, COOKIE_SECRET will be used if provided;
 * otherwise, a random string will be generated. Note that the random string
 * will be different with each server start; if the app is restarted, then all
 * existing client sessions will be invalidated.
 *
 * Docs: https://www.npmjs.com/package/cookie-session
 *
 * @param {Express.Application} app Express app to be modded
 */
function modCookieSession(app) {
  const secret = process.env.SESSION_KEYS || process.env.COOKIE_SECRET || randomString(36)

  app.use(cookieSession({
    keys: secret.split(';'),
    secure: Boolean(app.get('trust proxy')) || getProduction()
  }))
}

module.exports = modCookieSession
