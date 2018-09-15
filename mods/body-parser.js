const express = require('express')

/**
 * This mod adds body parser middlewares for parsing `application/json` and
 * `application/x-www-form-urlencoded` bodies.
 *
 * Docs:
 *   - http://expressjs.com/en/4x/api.html#express.json
 *   - http://expressjs.com/en/4x/api.html#express.urlencoded
 *
 * @param {Express.Application} app Express app to be modded
 */
function modBodyParser(app) {
  app.use(express.json())
  app.use(express.urlencoded({extended: false}))
}

module.exports = modBodyParser
