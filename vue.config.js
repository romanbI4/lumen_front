const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "api": {
        target: 'http://lumen.loc:8084',
        ws: true,
        changeOrigin: true
      }
    }
  }
});
