const bunyan = require('bunyan')
const {getDev} = require('../util/env')

/**
 * This mod adds a bunyan logger instance at `app.log`. It also adds a child
 * logger instance at every requests, with `req` and `res` added into log.
 *
 * Environment variables:
 *   - **LOG_NAME**: bunyan logger name (default: `'app'`).
 *   - **LOG_LEVEL**: bunyan logger level (default: `'debug'` in development,
 *     otherwise `'info'`).
 *
 * Docs: https://www.npmjs.com/package/bunyan
 *
 * @param {Express.Application} app Express app to be modded
 */
function modBunyan(app) {
  const dev = getDev()

  app.log = bunyan.createLogger({
    name: process.env.LOG_NAME || 'app',
    level: process.env.LOG_LEVEL || (dev ? 'debug' : 'info'),
    stream: dev ? devStream() : process.stdout,
    serializers: bunyan.stdSerializers
  })

  app.use((req, res, next) => {
    req.log = req.app.log.child({req, res})
    next()
  })
}

module.exports = modBunyan

/**
 * Helper to create dev stream with `bunyan-prettystream`.
 *
 * @returns {stream} stream for use with bunyan
 */
function devStream() {
  const PrettyStream = require('bunyan-prettystream')

  const stream = new PrettyStream()
  stream.pipe(process.stdout)

  return stream
}
