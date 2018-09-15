const path = require('path')
const {sync: glob} = require('glob')

/**
 * This mod loads all top-level scripts from `/routes` folder as routes.
 *
 * Only top-level scripts will be loaded; files inside subdirectories will
 * be ignored. Files whose name starts with underscore (`_`) will also be
 * ignored.
 *
 * Route objects can provide an optional `mountPath` property, which will be
 * used as path to mount the route in app.
 *
 * Note that unlike `load-mods` and `load-middlewares`, route paths are *not*
 * sorted.
 *
 * @param {Express.Application} app Express app to be modded
 */
function modLoadRoutes(app) {
  glob(path.resolve('./routes/*.js'))
    // Ignore files that started with underscore.
    .filter(routePath => !path.basename(routePath).startsWith('_'))
    // Use routes in server.
    .forEach(routePath => {
      const route = require(routePath)
      const {mountPath} = route

      if (mountPath) {
        app.use(mountPath, route)
      } else {
        app.use(route)
      }
    })
}

module.exports = modLoadRoutes
