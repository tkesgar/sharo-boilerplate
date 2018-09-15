const cookieSession = require('cookie-session')
const {getProduction} = require('../lib/env')

/**
 * This mod adds cookie-based session provider middleware to app.
 *
 * Note that `SESSION_KEYS` environment variable is required. If it is not
 * provided, this mod will throw an error. To provide multiple secret in
 * `SESSION_KEYS`, split it with semicolon (`;`) e.g. `'abc;123;456'`.
 *
 * `secure` is enabled if `trust proxy` app settings table is set to truthy.
 * Otherwise, `secure` is enabled only in production.
 *
 * Docs: https://www.npmjs.com/package/cookie-session
 *
 * @param {Express.Application} app Express app to be modded
 */
function modCookieSession(app) {
  const {SESSION_KEYS: sessionKeys} = process.env
  if (!sessionKeys) {
    throw new Error('\'SESSION_KEYS\' environment variable does not exist')
  }

  app.use(cookieSession({
    keys: sessionKeys.split(';'),
    secure: Boolean(app.get('trust proxy')) || getProduction()
  }))
}

module.exports = modCookieSession
