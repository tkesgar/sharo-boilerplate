const passport = require('passport')
const createStrategy = require('../util/create-strategy')

function passportMiddleware(opts = {}) {
  const {
    passportInstance = passport,
    strategies = defaultStrategies(),
    serializeUser = defaultSerializeUser,
    deserializeUser = defaultDeserializeUser,
    initialize = {},
    session = {}
  } = opts

  for (const [name, strategy] of Object.entries(strategies)) {
    passportInstance.use(name, strategy)
  }

  passportInstance.serializeUser((user, done) => {
    (async () => done(await serializeUser(user)))().catch(done)
  })

  passportInstance.deserializeUser((data, done) => {
    (async () => done(await deserializeUser(data)))().catch(done)
  })

  return [
    passportInstance.initialize(initialize),
    passportInstance.session(session)
  ]
}

module.exports = passportMiddleware

function defaultStrategies() {
  const {
    FACEBOOK_ID,
    FACEBOOK_SECRET,
    TWITTER_ID,
    TWITTER_SECRET,
    GOOGLE_ID,
    GOOGLE_SECRET,
    GITHUB_ID,
    GITHUB_SECRET
  } = process.env

  return Object.entries({
    facebook: [FACEBOOK_ID, FACEBOOK_SECRET],
    twitter: [TWITTER_ID, TWITTER_SECRET],
    google: [GOOGLE_ID, GOOGLE_SECRET],
    github: [GITHUB_ID, GITHUB_SECRET]
  }).reduce((strategies, [name, [id, secret]]) => ({
    ...strategies,
    ...((id && secret) ? {[name]: createStrategy(name)} : {})
  }), {})
}

function defaultSerializeUser(user) {
  return JSON.stringify(user)
}

function defaultDeserializeUser(data) {
  return JSON.parse(data)
}
