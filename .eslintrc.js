module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
    // node: true
  },
  globals: {
    process: false,
    Vue: false
  },
  extends: [
    'standard', 
    'plugin:vue/strongly-recommended'
  ],

  rules: {
    'prefer-promise-reject-errors': 0,

    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
