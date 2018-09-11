const path = require('path')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

/**
 * A Next.js configuration for use in sharo boilerplate.
 *
 * Uses `@zeit/next-sass` and `@zeit/next-bundle-analyzer` with minimal
 * extra configuration.
 *
 * Docs:
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
