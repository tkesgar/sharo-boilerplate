const cookieParser = require('cookie-parser')

/**
 * This mod adds cookie parser to app.
 *
 * If `COOKIE_SECRET` environment variable is defined, it will be used as
 * `secret` for the parser. To provide multiple secret, split with semicolon
 * (`;`) e.g. `'abc;123;456'`.
 *
 * Docs: https://www.npmjs.com/package/cookie-parser
 *
 * @param {Express.Application} app Express app to be modded
 */
function modCookieParser(app) {
  const secret = process.env.COOKIE_SECRET
  if (secret) {
    app.use(cookieParser(secret.split(';')))
  } else {
    app.use(cookieParser())
  }
}

module.exports = modCookieParser
