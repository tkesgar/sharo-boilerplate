const express = require('express')
const trustProxy = require('./trust-proxy')

test('Express app settings should not be modified if TRUST_PROXY is not defined', () => {
  const app = express()

  trustProxy(app)

  // From Express docs: default Express 'trust proxy' setting is false
  expect(app.get('trust proxy')).toBe(false)
})

test('Express app settings should be modified if TRUST_PROXY is defined', () => {
  process.env.TRUST_PROXY = JSON.stringify(true)
  const app = express()

  trustProxy(app)

  expect(app.get('trust proxy')).toBe(true)
  delete process.env.TRUST_PROXY
})

test('trustProxy should throw error if TRUST_PROXY is not a proper JSON', () => {
  process.env.TRUST_PROXY = '{"this is": anInvalidJSONString}'
  const app = express()

  expect(() => trustProxy(app)).toThrow()

  delete process.env.TRUST_PROXY
})
