const path = require('path')
const {sync: glob} = require('glob')

/**
 * This mod loads all top-level scripts from `/middlewares` folder as
 * middlewares.
 *
 * Only top-level scripts will be loaded; files inside subdirectories will
 * be ignored. Files whose name starts with underscore (`_`) will also be
 * ignored.
 *
 * Middleware paths are sorted before added. This means you can use Linux
 * config-style naming for the middlewares:
 *   - `00-first.js`
 *   - `01-second.js`
 *   - `10-third.js`
 *   - `50-not-last.js`
 *   - `99-last.js`
 *
 * @param {Express.Application} app Express app to be modded
 */
function modLoadMiddlewares(app) {
  glob(path.resolve('./middlewares/*.js'))
    // Ignore files that started with underscore.
    .filter(middlewarePath => !path.basename(middlewarePath).startsWith('_'))
    // Sort paths.
    .sort()
    // Use middlewares in server.
    .forEach(middlewarePath => app.use(require(middlewarePath)))
}

module.exports = modLoadMiddlewares
