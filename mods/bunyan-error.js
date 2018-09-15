/**
 * This mod adds an error handler middleware which calls `req.log.error({err})`
 * and pass the error to next error middleware. It is intended to work with
 * `bunyan` mod, which adds a logger child instance in request object.
 *
 * Note that since this mod adds an error handler, this mod should be loaded
 * after all other mods.
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
