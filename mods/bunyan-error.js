/**
 * This mod works in conjunction with `bunyan` mod. It adds an error handler
 * middleware which logs all errors using the logger available in `req.log`.
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
