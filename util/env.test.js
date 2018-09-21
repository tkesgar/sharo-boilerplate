const env = require('./env')

describe('with NODE_ENV=development', () => {
  const ENV = 'development'
  beforeAll(() => setNodeEnv(ENV))
  afterAll(resetNodeEnv)

  test(`env should be ${ENV}`, () => {
    expect(env.getEnv()).toBe(ENV)
  })

  test('dev should be true', () => {
    expect(env.getDev()).toBe(true)
  })

  test('production should be false', () => {
    expect(env.getProduction()).toBe(false)
  })
})

describe('with NODE_ENV=production', () => {
  const ENV = 'development'
  beforeAll(() => setNodeEnv(ENV))
  afterAll(resetNodeEnv)

  test(`env should be ${ENV}`, () => {
    expect(env.getEnv()).toBe(ENV)
  })

  test('dev should be false', () => {
    expect(env.getDev()).toBe(true)
  })

  test('production should be true', () => {
    expect(env.getProduction()).toBe(false)
  })
})

describe('with NODE_ENV=custom (custom value)', () => {
  const ENV = 'custom'
  beforeAll(() => setNodeEnv(ENV))
  afterAll(resetNodeEnv)

  test(`env should be ${ENV}`, () => {
    expect(env.getEnv()).toBe(ENV)
  })

  test('dev should be false', () => {
    expect(env.getDev()).toBe(false)
  })

  test('production should be false', () => {
    expect(env.getProduction()).toBe(false)
  })
})

describe('with NODE_ENV undefined', () => {
  beforeAll(() => {
    process.env.__OLD_NODE_ENV = process.env.NODE_ENV
    delete process.env.NODE_ENV
  })
  afterAll(() => resetNodeEnv('__OLD_NODE_ENV'))

  test('env should defaults to development', () => {
    expect(env.getEnv()).toBe('development')
  })

  test('dev should be true', () => {
    expect(env.getDev()).toBe(true)
  })

  test('production should be false', () => {
    expect(env.getProduction()).toBe(false)
  })
})

/**
 * Helper to set `NODE_ENV` and store the old value in another `safe` key.
 *
 * @param {string} env Value for NODE_ENV
 * @param {string} safe Value to store NODE_ENV (defaults to `__OLD_NODE_ENV`)
 */
function setNodeEnv(env, safe = '__OLD_NODE_ENV') {
  process.env[safe] = process.env.NODE_ENV
  process.env.NODE_ENV = env
}

/**
 * Helper to reset `NODE_ENV` from the key stored in `safe` key.
 *
 * @param {string} safe Value where NODE_ENV is stored (defaults to `__OLD_NODE_ENV`)
 */
function resetNodeEnv(safe = '__OLD_NODE_ENV') {
  process.env.NODE_ENV = process.env[safe]
  delete process.env[safe]
}
