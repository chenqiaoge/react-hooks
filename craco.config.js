const { when, whenDev, whenProd, whenTest } = require("@craco/craco");
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
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