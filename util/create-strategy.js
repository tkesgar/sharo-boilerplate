const GoogleStrategy = require('passport-google-oauth20')
const {Strategy: FacebookStrategy} = require('passport-facebook')
const {Strategy: GitHubStrategy} = require('passport-github')
const {Strategy: TwitterStrategy} = require('passport-twitter')
const baseURL = require('./baseurl')

/**
 * Helper to create a Passport strategy for the given `provider`.
 *
 * List of supported providers:
 *   - Social media providers: `'facebook'`, `'twitter'`, `'google'`, `'github'`
 *     - Social media tokens and secrets should be provided via environment
 *       variables `[PROVIDER]_ID` and `[PROVIDER]_SECRET`, e.g. `FACEBOOK_ID`
 *       and `FACEBOOK_SECRET`.
 *     - Additional configuration for the strategy constructor can be passed
 *       via `opts`.
 *     - If `verify` function is not provided, a default function will be used
 *       that simply returns the user object provided by the strategy.
 *   - Local provider: `'local'`
 *     - Note that `verify` function *must* be provided.
 *
 * Docs:
 *   - https://github.com/jaredhanson/passport-facebook
 *   - https://github.com/jaredhanson/passport-twitter
 *   - https://github.com/jaredhanson/passport-google-oauth2
 *   - https://github.com/jaredhanson/passport-github
 *
 * @param {string} provider Strategy to be created (must be one of the provider string listed above)
 * @param {any} opts Additional options
 * @param {function} verify Callback function
 * @returns {Strategy} The created Passport strategy
 */
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
        throw new Error('\'FACEBOOK_ID\' and \'FACEBOOK_SECRET\' environment variables does not exist')
      }

      return new FacebookStrategy({
        clientID: FACEBOOK_ID,
        clientSecret: FACEBOOK_SECRET,
        ...opts
      }, verify)
    case 'twitter':
      if (!(TWITTER_ID && TWITTER_SECRET)) {
        throw new Error('\'TWITTER_ID\' and \'TWITTER_SECRET\' environment variables does not exist')
      }

      return new TwitterStrategy({
        consumerKey: TWITTER_ID,
        consumerSecret: TWITTER_SECRET,
        ...opts
      }, verify)
    case 'google':
      if (!(GOOGLE_ID && GOOGLE_SECRET)) {
        throw new Error('\'GOOGLE_ID\' and \'GOOGLE_SECRET\' environment variables does not exist')
      }

      return new GoogleStrategy({
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        ...opts
      }, verify)
    case 'github':
      if (!(GITHUB_ID && GITHUB_SECRET)) {
        throw new Error('\'GITHUB_ID\' and \'GITHUB_SECRET\' environment variables does not exist')
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
