const dotenv = require('dotenv')

/**
 * Loads .env using `dotenv`. Useful in boilerplate to avoid installing dotenv
 * in `package.json` of the boilerplate.
 *
 * Docs: https://www.npmjs.com/package/dotenv
 */
function loadDotenv() {
  dotenv.load()
}

module.exports = loadDotenv
