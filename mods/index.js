/**
 * A standard set of mods.
 */
const stdMods = [
  require('./trust-proxy'),
  require('./bunyan'),
  require('./helmet'),
  require('./body-parser'),
  require('./cookie-parser'),
  require('./cookie-session'),
  require('./csurf'),
  require('./load-mods'),
  require('./load-middlewares'),
  require('./load-routes'),
  require('./next'),
  require('./bunyan-error')
]

module.exports = stdMods
