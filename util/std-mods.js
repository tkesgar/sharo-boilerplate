/**
 * A default set of mods from sharo.
 */
const stdMods = [
  require('../mods/helmet'),
  require('../mods/trust-proxy'),
  require('../mods/bunyan'),
  require('../mods/cookie-parser'),
  require('../mods/body-parser'),
  require('../mods/cookie-session'),
  require('../mods/passport'),
  require('../mods/csurf'),
  require('../mods/load-mods'),
  require('../mods/load-middlewares'),
  require('../mods/load-routes'),
  require('../mods/next'),
  require('../mods/bunyan-error')
]

module.exports = stdMods
