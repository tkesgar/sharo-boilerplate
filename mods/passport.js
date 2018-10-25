/**
 * This mod adds Passport.js middlewares to app.
 *
 * Note that `passport` should be installed manually.
 *
 * The Passport instance is taken from `app.passport`. If `app.passport` does
 * not exist, the Passport instance from `require('passport')` is used instead.
 *
 * Session handling should be available in the app (i.e. `req.session` exists).
 * You can use `cookie-session` mod or use third-party session provider such as
 * `express-session`.
 *
 * Note that the authentication strategies must be declared separately in the
 * application via the passport module.
 *
 * Docs: http://www.passportjs.org/docs/downloads/html/
 *
 * @param {Express.Application} app Express app to be modded
 */
function modPassport(app) {
  const {passport = require('passport')} = app // eslint-disable-line import/no-unresolved

  app.use(passport.initialize())
  app.use(passport.session())
}

module.exports = modPassport
