/**
 * A standard set of sharo mods.
 */
const stdMods = [
  require('./trust-proxy'),
  require('./bunyan'),
  require('./helmet'),
  require('./body-parser'),
  require('./cookie-parser'),
  require('./csurf'),
  require('./cookie-session'),
  require('./load-middlewares'),
  require('./load-routes'),
  require('./next'),
  require('./bunyan-error')
]

module.exports = stdMods
