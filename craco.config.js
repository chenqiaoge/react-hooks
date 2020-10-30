// 配置文档地址：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation
const { when, whenDev, whenProd, whenTest } = require("@craco/craco");
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('src'),
      '@store': pathResolve('src/store'),
      '@utils': pathResolve('src/utils')
    },
    plugins: [],
    configure: (config, { env, paths }) => {
      // env:development,production
      if (env === 'production') {
        config.mode = 'production'
        config.devtool = false
      }
      // console.log('env：', env, config)
      return config
    }
  }
}