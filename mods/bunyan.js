const bunyan = require('bunyan')
const {getDev} = require('../lib/env')

/**
 * This mod adds a bunyan logger instance at `app.log`. It also adds a
 * middleware to add a child logger to `req`, with `req` and `res` added into
 * log.
 *
 * `LOG_NAME` environment variable is used as bunyan logger name
 * Defaults to `app` if not provided.
 *
 * `LOG_LEVEL` environment variable is used as bunyan logger level.
 * Defaults to `debug` in development and `info` in production.
 *
 * @param {Express.Application} app Express app to be modded
 */
function modBunyan(app) {
  const dev = getDev()

  const {
    LOG_NAME: name = 'app',
    LOG_LEVEL: level = dev ? 'debug' : 'info'
  } = process.env

  app.log = bunyan.createLogger({
    name,
    level,
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
