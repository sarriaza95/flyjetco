const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
module.exports = {
  webpack: {
    plugins: {
      add: [
        new WindiCSSWebpackPlugin({
          virtualModulePath: 'src'
        })
      ],
    },
    configure: {
      output: {
        filename: '[name].js'
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks (chunk) {
            return false
          }
        }
      }
    }
  },
}
