// 配置文档地址：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation
// const { when, whenDev, whenProd, whenTest } = require("@craco/craco");
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)
const CracoLessPlugin = require('craco-less');

module.exports = {
  style: {
  },
  webpack: {
    alias: {
      '@': pathResolve('src'),
      '@store': pathResolve('src/store'),
      '@utils': pathResolve('src/utils'),
      '@common': pathResolve('src/components/common'),
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
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}

// https://blog.csdn.net/sinat_36728518/article/details/106230874