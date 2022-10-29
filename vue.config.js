const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 解决后端的登录状态问题
  devServer: {
    https: true
  },
  // baseUrl: './',
  pwa: {
    iconPaths: {
        favicon32: './favicon.ico',
        favicon16: './favicon.ico',
        appleTouchIcon: './favicon.ico',
        maskIcon: './favicon.ico',
        msTileImage: './favicon.ico'
    },
    baseUrl: './',
  // assetsDir: 'assets',
  publicPath:'./'
}
})


