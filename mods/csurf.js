const csurf = require('csurf')

/**
 * This mod adds csurf middleware to app for mitigating CSRF attacks.
 *
 * Note that csurf here is configured to use cookies instead of session.
 * This allows csurf to be used without session support, but it requires a
 * cookie parser; you can use `cookie-parser` mod to add one.
 *
 * Docs: https://www.npmjs.com/package/csurf
 *
 * @param {Express.Application} app Express app to be modded
 */
function modCsurf(app) {
  app.use(csurf({cookie: true}))
}

module.exports = modCsurf
