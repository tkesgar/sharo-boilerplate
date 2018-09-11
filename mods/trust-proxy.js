/**
 * This mod adds `trust proxy` settings to the app settings table. The value
 * is read from `TRUST_PROXY` environment variable parsed as JSON.
 *
 * @param {Express.Application} app Express app to be modded
 */
function modTrustProxy(app) {
  const trustProxyJSON = process.env.TRUST_PROXY
  if (!trustProxyJSON) {
    return
  }

  const trustProxy = JSON.parse(trustProxyJSON)
  app.set('trust proxy', JSON.parse(trustProxy))
}

module.exports = modTrustProxy
