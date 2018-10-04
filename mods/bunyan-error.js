/**
 * This mod adds an error handler middleware which logs error and pass the error
 * to the next error middleware. This mod is intended for use with `bunyan` mod,
 * which adds a logger child instance at `req.log`.
 *
 * > Note: Since this mod adds an error handler into the app, this mod should be
 * loaded after all other mods.
 *
 * @param {Express.Application} app Express app to be modded
 */
function modBunyanError(app) {
  app.use((err, req, res, next) => {
    req.log.error({err})
    next(err)
  })
}

module.exports = modBunyanError
