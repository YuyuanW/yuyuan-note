const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 解决后端的登录状态问题
  devServer: {
    https: true
  }
})
