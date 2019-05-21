// 生产环境下使用的webpack配置, 在package.json的build脚本命令中设置

const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: __dirname + '/src/js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle-[hash].js' // 当原文件有改动, 打包后的js文件名中的哈希值会变
  },
  mode: 'production',
  devtool: "none",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    },{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({ // 调用css与js分离的插件的api
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        },{
          loader: "postcss-loader"
        }]
      })
    }]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: __dirname + '/public/temp.html'
    }),
    new ExtractTextPlugin("style.css"), // css与js分离的插件
    new CleanWebpackPlugin({ // 打包文件哈希值变动后，旧文件仍然存在, 需要插件清理掉旧文件
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
}