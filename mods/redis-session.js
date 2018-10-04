const session = require('express-session')
const connectRedis = require('connect-redis')
const {getProduction} = require('../util/env')

/**
 * This mod adds Redis-backed session provider middleware to app, using
 * `express-session` middleware and `connect-redis` store.
 *
 * `resave` and `saveUninitialized` is set to `false`, while `secure` is set to
 * `true` if `trust proxy` app settings table is truthy or in production.
 *
 * Environment variables:
 *   - **SECRET** *(required)*: secret string(s) for cookie-parser to encrypt
 *     the cookies. To provide multiple secrets, use a semicolon between each
 *     strings, e.g. `abc;123;456`.
 *   - **REDIS_SESSION**: a JSON string containing custom configurations for
 *     connect-redis (default: none)
 *
 * Docs:
 *   - https://www.npmjs.com/package/express-session
 *   - https://www.npmjs.com/package/connect-redis
 *
 * @param {Express.Application} app Express app to be modded
 */
function modSession(app) {
  const {
    SECRET: secret,
    REDIS_SESSION: redisConfig = '{}'
  } = process.env

  if (!secret) {
    throw new Error('\'SECRET\' environment variable does not exist')
  }

  const RedisStore = connectRedis(session)

  app.use(session({
    cookie: {
      secure: Boolean(app.get('trust proxy')) || getProduction()
    },
    secret: secret.split(';'),
    store: new RedisStore(JSON.parse(redisConfig)),
    saveUninitialized: false,
    resave: false
  }))
}

module.exports = modSession
