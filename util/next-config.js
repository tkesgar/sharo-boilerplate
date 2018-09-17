const path = require('path')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

/**
 * A Next.js configuration for use in sharo boilerplate, intended for use in
 * `next.config.js`.
 *
 * Note that while `next` is listed as `peerDependencies` and should be
 * installed manually, the plugins and tools are already installed by sharo.
 *
 * Features:
 *   - SASS/SCSS support via `@zeit/next-sass`
 *   - Bundle analysis reporter via `@zeit/next-bundle-analyzer`
 *
 * To generate bundle analysis report, provide `BUNDLE_ANALYZE` with one of the
 * following values:
 *   - `server`: generate server report only
 *   - `client`: generate client report only
 *   - `both`: generate both server and client report
 *
 * Docs:
 *   - https://nextjs.org/docs#custom-configuration
 *   - https://www.npmjs.com/package/@zeit/next-sass
 *   - https://www.npmjs.com/package/@zeit/next-bundle-analyzer
 */
const nextConfig = withSass(withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: path.resolve('./bundles/server.html')
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: path.resolve('./bundles/client.html')
    }
  }
}))

module.exports = nextConfig
