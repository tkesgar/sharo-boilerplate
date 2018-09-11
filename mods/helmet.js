const helmet = require('helmet')

/**
 * This mod adds helmet middleware to app.
 *
 * Docs: https://helmetjs.github.io/
 *
 * @param {Express.Application} app Express app to be modded
 */
function modHelmet(app) {
  app.use(helmet())
}

module.exports = modHelmet
