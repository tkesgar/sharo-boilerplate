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
async function createApp(mods = stdMods) {
  const app = express()

  await recursiveApplyMods(app, mods)

  return app
}
exports.createApp = createApp

/**
 * Convenience method for running `createApp` and start listening on `PORT`
 * (default: 3000) using `app.listen()`.
 *
 * Errors will be printed using `app.log`; if `app.log` does not exists, the
 * error will be printed to `stderr` instead.
 *
 * @param {any[]} mods Array of mods
 */
function start(mods = stdMods) {
  (async () => {
    const app = await createApp(mods)
    const port = parseInt(process.env.PORT, 10) || 3000
    app.listen(port, err => {
      if (err) {
        if (app.log) {
          app.log.error(err)
        } else {
          console.error(err)
        }
        process.exitCode = 1
        return
      }

      app.log.info(`Server listening at port ${port}`)
    })
  })().catch(error => {
    console.error(error)
    process.exitCode = 1
  })
}
exports.start = start

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
