const next = require('next') // eslint-disable-line import/no-unresolved
const {getDev} = require('../lib/env')

/**
 * This mod adds Next.js request handler to app.
 *
 * Docs: https://nextjs.org/docs
 *
 * @param {Express.Application} app Express app to be modded
 */
async function modNext(app) {
  const dev = getDev()

  const nextApp = next({dev})
  await nextApp.prepare()

  app.get('*', nextApp.getRequestHandler())
}

module.exports = modNext
