/**
 * This mod adds `trust proxy` settings to the app settings table, with the
 * value parsed from `TRUST_PROXY`.
 *
 * Environment variable:
 *   - `TRUST_PROXY`: JSON string containing configuration for 'trust proxy'
 *
 * @param {Express.Application} app Express app to be modded
 */
function modTrustProxy(app) {
  const trustProxy = process.env.TRUST_PROXY
  if (!trustProxy) {
    return
  }

  app.set('trust proxy', JSON.parse(trustProxy))
}

module.exports = modTrustProxy
