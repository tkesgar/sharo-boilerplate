const {Strategy: FacebookStrategy} = require('passport-facebook')
const {Strategy: TwitterStrategy} = require('passport-twitter')
const {Strategy: GitHubStrategy} = require('passport-github')
const GoogleStrategy = require('passport-google-oauth20')
const baseURL = require('./baseurl')

function createStrategy(provider, opts = {}, verify = defaultVerify) {
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

  opts = {
    callbackURL: `${baseURL()}/auth/${provider}/callback`,
    ...opts
  }

  switch (provider) {
    case 'facebook':
      if (!(FACEBOOK_ID && FACEBOOK_SECRET)) {
        throw new Error('FACEBOOK_ID and FACEBOOK_SECRET environment variables does not exist')
      }

      return new FacebookStrategy({
        clientID: FACEBOOK_ID,
        clientSecret: FACEBOOK_SECRET,
        ...opts
      }, verify)
    case 'twitter':
      if (!(TWITTER_ID && TWITTER_SECRET)) {
        throw new Error('TWITTER_ID and TWITTER_SECRET environment variables does not exist')
      }

      return new TwitterStrategy({
        consumerKey: TWITTER_ID,
        consumerSecret: TWITTER_SECRET,
        ...opts
      }, verify)
    case 'google':
      if (!(GOOGLE_ID && GOOGLE_SECRET)) {
        throw new Error('GOOGLE_ID and GOOGLE_SECRET environment variables does not exist')
      }

      return new GoogleStrategy({
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        ...opts
      }, verify)
    case 'github':
      if (!(GITHUB_ID && GITHUB_SECRET)) {
        throw new Error('GITHUB_ID and GITHUB_SECRET environment variables does not exist')
      }

      return new GitHubStrategy({
        clientID: GITHUB_ID,
        clientSecret: GITHUB_SECRET,
        ...opts
      }, verify)
    default:
      throw new Error(`Unknown strategy provider: ${provider}`)
  }
}

module.exports = createStrategy

function defaultVerify(token, secret, profile, done) {
  done(null, profile)
}
