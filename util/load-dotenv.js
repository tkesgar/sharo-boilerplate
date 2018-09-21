const dotenv = require('dotenv')

/**
 * Loads .env files using `dotenv`.
 *
 * Useful in boilerplate to avoid installing dotenv in the `package.json`.
 *
 * Docs: https://www.npmjs.com/package/dotenv
 *
 * @returns {any} dotenv `load()` return value
 */
function loadDotenv() {
  return dotenv.load()
}

module.exports = loadDotenv
