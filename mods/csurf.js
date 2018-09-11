const csurf = require('csurf')

/**
 * This mod adds csurf to app.
 *
 * Note that csurf here is configured to use cookies instead of session.
 * This allows csurf to be used without session support.
 *
 * Docs: https://www.npmjs.com/package/csurf
 *
 * @param {Express.Application} app Express app to be modded
 */
function modCsurf(app) {
  app.use(csurf({cookie: true}))
}

module.exports = modCsurf
