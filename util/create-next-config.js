const path = require('path')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withMdx = require('@zeit/next-mdx')
const withSass = require('@zeit/next-sass')
const withWorkers = require('@zeit/next-workers')

const plugins = [
  withBundleAnalyzer,
  withMdx,
  withSass,
  withWorkers
]

/**
 * Returns a Next.js configuration intended for use in `next.config.js`. The
 * plugins and tools are already included in sharo.
 *
 * Features:
 *   - Bundle analysis reporter via `@zeit/next-bundle-analyzer`
 *   - MDX support via `@zeit/next-mdx`
 *   - Web Workers transpilation support via `@zeit/next-workers`
 *   - SASS/SCSS support via `@zeit/next-sass`
 *
 * To generate bundle analysis report, provide `BUNDLE_ANALYZE` environment
 * variable with one of the following values:
 *   - `server`: generate server report only
 *   - `client`: generate client report only
 *   - `both`: generate both server and client report
 *
 * Docs:
 *   - https://nextjs.org/docs#custom-configuration
 *   - https://www.npmjs.com/package/@zeit/next-bundle-analyzer
 *   - https://www.npmjs.com/package/@zeit/next-mdx
 *   - https://www.npmjs.com/package/@zeit/next-sass
 *   - https://www.npmjs.com/package/@zeit/next-workers
 *
 * @returns {any} Next.js configuration object
 */
function createNextConfig() {
  const {BUNDLE_ANALYZE} = process.env

  const config = {
    analyzeServer: ['server', 'both'].includes(BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(BUNDLE_ANALYZE),
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
  }

  return plugins.reduce((cfg, fn) => fn(cfg), config)
}

module.exports = createNextConfig
