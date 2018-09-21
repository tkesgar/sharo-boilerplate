/**
 * Helper to return a base URL for use in apps.
 *
 * If there is `BASEURL` environment variable defined, use it as base URL.
 * Otherwise, determine the base URL from `PROTOCOL` (defaults to `'http'`),
 * `DOMAIN` (`'localhost'`), and `PORT` (`'80'`) concacenated into
 * `[PROTOCOL]://[DOMAIN]:[PORT]`.
 *
 * Note that `[PORT]` will be omitted on:
 *   - port 80 and protocol HTTP
 *   - port 443 and protocol HTTPS
 *
 * @returns {string} Base URL for use in apps
 */
function baseURL() {
  const {BASEURL} = process.env
  if (BASEURL) {
    return BASEURL
  }

  const {
    PROTOCOL = 'http',
    DOMAIN = 'localhost',
    PORT = '80'
  } = process.env

  const port = parseInt(PORT, 10)
  if (!port || isHTTP(PROTOCOL, port) || isHTTPS(PROTOCOL, port)) {
    return `${PROTOCOL}://${DOMAIN}`
  }

  return `${PROTOCOL}://${DOMAIN}:${port}`
}

module.exports = baseURL

/**
 * Helper that checks `protocol` and `port` whether it is the standard protocol
 * and port for HTTP (protocol is `'http'` and port is `80`).
 *
 * @param {any} protocol The protocol
 * @param {any} port The port
 * @returns {boolean} `true` if is protocol and port is standard
 */
function isHTTP(protocol, port) {
  return protocol === 'http' && port === 80
}

/**
 * Helper that checks `protocol` and `port` whether it is the standard protocol
 * and port for HTTPS (protocol is `'https'` and port is `443`).
 *
 * @param {any} protocol The protocol
 * @param {any} port The port
 * @returns {boolean} `true` if is protocol and port is standard
 */
function isHTTPS(protocol, port) {
  return protocol === 'https' && port === 443
}
