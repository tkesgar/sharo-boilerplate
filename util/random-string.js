const crypto = require('crypto')

/**
 * Generates a random string with the specified `length`.
 *
 * @param {number} length Length of string to be generated
 * @returns {string} The generated random string
 */
function randomString(length = 16) {
  const gen = Math.ceil((length + 4) / 1.5)
  return crypto.randomBytes(gen).toString('base64').substr(0, length)
}

module.exports = randomString
