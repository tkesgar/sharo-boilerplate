const express = require('express')
const stdMods = require('./mods')

/**
 * Given an array of `mods`, create a new Express app and apply each mod in
 * order. Then, resolve with the Express app.
 *
 * Mods are anything that can be called with an Express app as parameter.
 * Mod return values or, in case of async function resolved values, are
 * ignored.
 *
 * @param {any[]} mods An array of sharo mods.
 * @returns {Promise<Express.Application>} A Promise that resolves to an Express app.
 */
async function sharo(mods = stdMods) {
  const app = express()

  /* eslint-disable no-await-in-loop */
  for (const mod of mods) {
    if (Array.isArray(mod)) {
      for (const subMod of mod) {
        await subMod(app)
      }
    } else { // (!Array.isArray(mod))
      await mod(app)
    }
  }
  /* eslint-enable no-await-in-loop */

  return app
}

module.exports = sharo
