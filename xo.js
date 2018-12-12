/* eslint-disable quote-props */

module.exports = {
  extends: 'xo-react',
  parser: 'babel-eslint',
  space: 2,
  semicolon: false,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.md', '.mdx', '.scss']
      }
    }
  }
}
