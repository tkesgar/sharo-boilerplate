const bunyan = require('bunyan')
const {getDev} = require('../util/env')

/**
 * This mod adds a bunyan logger instance at `app.log`. It also adds a
 * middleware to add a child logger instance at `req`, with `req` and `res`
 * added into log.
 *
 * `LOG_NAME` environment variable is used as bunyan logger name. It will
 * default to `app` if not provided.
 *
 * `LOG_LEVEL` environment variable is used as bunyan logger level. It will
 * default to `debug` in development and `info` otherwise.
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
    stream: dev ? createDevStream() : process.stdout,
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
function createDevStream() {
  const PrettyStream = require('bunyan-prettystream')

  const stream = new PrettyStream()
  stream.pipe(process.stdout)

  return stream
}
