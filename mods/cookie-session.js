const cookieSession = require('cookie-session')
const {getProduction} = require('../util/env')

/**
 * This mod adds cookie-based session provider middleware to app.
 *
 * `secure` is enabled if `trust proxy` app settings table is truthy or in
 * production.
 *
 * Environment variables:
 *   - **SECRET** *(required)*: secret string(s) for cookie-parser to encrypt
 *     the cookies. To provide multiple keys, use a semicolon between each
 *     strings, e.g. `abc;123;456`.
 *
 * Docs: https://www.npmjs.com/package/cookie-session
 *
 * @param {Express.Application} app Express app to be modded
 */
function modCookieSession(app) {
  const {SECRET: secret} = process.env
  if (!secret) {
    throw new Error('\'{SECRET\' environment variable does not exist')
  }

  app.use(cookieSession({
    keys: secret.split(';'),
    secure: Boolean(app.get('trust proxy')) || getProduction()
  }))
}

module.exports = modCookieSession
