/* global module */
module.exports = {
  chainWebpack: config =>
    config.module.rule('vue')
      .use('vue-loader')
        .tap(options => Object.assign({}, options, {template: {doctype: 'html'}}))
}