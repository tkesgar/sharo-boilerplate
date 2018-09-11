const path = require('path')
const {sync: glob} = require('glob')

/**
 * This mod loads all top-level scripts from `/mods` folder as mods.
 *
 * Only top-level scripts will be loaded; files inside subdirectories will
 * be ignored. Files whose name starts with underscore (`_`) will also be
 * ignored.
 *
 * Mod paths are sorted before run. This means you can use Linux config-style
 * naming to order mods:
 *   - `00-first.js`
 *   - `01-second.js`
 *   - `10-third.js`
 *   - `50-not-last.js`
 *   - `99-last.js`
 *
 * @param {Express.Application} app Express app to be modded
 */
async function modLoadMods(app) {
  const mods = glob(path.resolve('./mods/*.js'))
    // Ignore files that started with underscore.
    .filter(modPath => !path.basename(modPath).startsWith('_'))
    // Sort paths.
    .sort()
    // Load mods.
    .map(modPath => require(modPath))

  // Run mods with app as parameter.
  for (const mod of mods) {
    // eslint-disable-next-line no-await-in-loop
    await mod(app)
  }
}

module.exports = modLoadMods
