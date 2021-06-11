module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/SimpleFS/' : '/',
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md$/i)
      .use('vue-html-loader')
      .loader('vue-html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  }
}
