const cookieParser = require('cookie-parser')

/**
 * This mod adds the cookie parser middleware to app.
 *
 * Environment variables:
 *   - **SECRET**: secret string(s) for cookie-parser to encrypt the cookies
 *     (default: none). To provide multiple secrets, use a semicolon between
 *     each strings, e.g. `abc;123;456`. If it is not provided, cookies will be
 *     parsed and serialized as-is.
 *
 * Docs: https://www.npmjs.com/package/cookie-parser
 *
 * @param {Express.Application} app Express app to be modded
 */
function modCookieParser(app) {
  const {SECRET: secret} = process.env

  if (secret) {
    app.use(cookieParser(secret.split(';')))
  } else {
    app.use(cookieParser())
  }
}

module.exports = modCookieParser
