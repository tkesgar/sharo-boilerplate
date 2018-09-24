const session = require('express-session')
const connectRedis = require('connect-redis')
const {getProduction} = require('../util/env')

const RedisStore = connectRedis(session)

/**
 * This mod adds Redis-backed session provider middleware to app.
 *
 * Note that one of the following environment variables is required to be used
 * as secret string(s) for the identifier cookie:
 *   - `COOKIE_SECRET` (for compatibility with `cookie-parser`)
 *   - `SESSION_KEYS`
 *
 * If none are provided, this mod will throw an error. If both are provided,
 * `COOKIE_SECRET` is used instead of `SESSION_KEYS`. To provide multiple
 * secrets, split it with semicolon (`;`) e.g. `'abc;123;456'`.
 *
 * Custom configuration to Redis database can be provided as JSON at
 * `REDIS_SESSION_CONFIG` environment variable.
 *
 * `secure` is enabled if `trust proxy` app settings table is truthy or in
 * production. `resave` and `saveUninitialized` is set to `false` because the
 * Redis store should work without problems with that.
 *
 * Docs:
 *   - https://www.npmjs.com/package/express-session
 *   - https://www.npmjs.com/package/connect-redis
 *
 * @param {Express.Application} app Express app to be modded
 */
function modSession(app) {
  const sessionKeys = process.env.COOKIE_SECRET || process.env.SESSION_KEYS
  if (!sessionKeys) {
    throw new Error('\'COOKIE_SECRET\' or \'SESSION_KEYS\' environment variables does not exist')
  }

  app.use(session({
    secret: sessionKeys.split(';'),
    secure: app.get('trust proxy') || getProduction(),
    store: new RedisStore(JSON.parse(process.env.REDIS_SESSION_CONFIG || '{}')),
    resave: false,
    saveUninitialized: false
  }))
}

module.exports = modSession
