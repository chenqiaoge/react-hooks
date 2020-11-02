const { when, whenDev, whenProd, whenTest } = require("@craco/craco");
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)
// const sassResourcesLoader = require('craco-sass-resources-loader')

module.exports = {
  style: {
  },
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
  },
  // plugins: [
  //   {
  //     plugin: sassResourcesLoader,
  //     options: {
  //       resources: [
  //         './src/assets/layout.scss',
  //         // './src/my-other-config-theme.scss'
  //       ],
  //     },
  //   },
  // ],
}

// https://blog.csdn.net/sinat_36728518/article/details/106230874