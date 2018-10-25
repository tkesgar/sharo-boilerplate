const express = require('express')
const stdMods = require('./util/std-mods')

/**
 * Given an array of `mods`, create a new Express app and apply all mod in
 * `mods`. Then, resolve with the Express app.
 *
 * A mod is:
 *   1. A function. In this case, mod will be applied by calling the mod with an
 *      Express app as a single argument. Mod return/resolve values are ignored.
 *   2. An array of mods. In this case, each mod will be applied in order.
 *
 * If `mods` are not provided, a standard set of mods is used.
 *
 * If you use `load-mods` mod, you can put mods in a `mods/` directory and sharo
 * will load all of them. See the module for more details.
 *
 * @param {any[]} mods Array of mods
 * @returns {Promise<Express.Application>} Express app promise
 */
async function sharo(mods = stdMods) {
  const app = express()

  await recursiveApplyMods(app, mods)

  return app
}

module.exports = sharo

/**
 * Helper function to recursively apply mods.
 *
 * @param {Express.Application} app Express app that will be passed to mods
 * @param {(function(Express.Application): Promise<void>)[]} mods Array of mods
 */
async function recursiveApplyMods(app, mods) {
  /* eslint-disable no-await-in-loop */
  for (const mod of mods) {
    if (Array.isArray(mod)) {
      await recursiveApplyMods(app, mod)
    } else {
      await mod(app)
    }
  }
  /* eslint-enable no-await-in-loop */
}
