#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const xo = require('../xo')

const pkgJsonPath = path.resolve('./package.json')

fs.writeFileSync(pkgJsonPath, JSON.stringify({
  ...(require(pkgJsonPath)),
  xo
}, null, 2))
