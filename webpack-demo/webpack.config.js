// 默认的webpack配置文件, 在开发环境中使用, 生产环境使用webpack.production.config.js

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: __dirname + '/src/js/main.js', // 入口文件, __dirname是node.js全局变量, 当前文件所在目录
  output: {
    path: __dirname + '/dist', // 打包输出的路径
    // publicPath属性, 给静态文件前加上路径
    filename: 'bundle.js' // 打包出的js文件名
  },
  mode: 'production', // 打包模式, 有"production", "development"
  devtool: 'source-map', // 生成source-map文件，方便打包后的js调试, 生成环境一般不用
  devServer: { // 开发环境下的本地服务器配置
    contentBase: path.join(__dirname, 'dist'), //指定本地服务器的根目录
    // publicPath属性, 指定本地服务器打包的路径, 虚拟路径, 打包文件实际在内存中
    compress: true, // 是否压缩代码
    port: 8080, // 监听端口
    progress: true, // 是否显示编译进度
    hot: true // 是否热更新
  },
  module: { // 模块相关
    rules: [{
      test: /\.(js|jsx)$/, // 以.js或.jsx为后缀的文件
      use: {
        loader: "babel-loader" // 使用babel编译
      },
      exclude: /node_modules/ // 添加例外的目录
      // babel相关的配置可以写在这里(options: {}), 也可以写在根目录中的.babelrc文件中
    },
    {
      test: /\.css$/, // 以.css为后缀的文件
      use: [{
        loader: 'style-loader' // 负责计算css样式加到页面中
      },{
        loader: 'css-loader', // 处理css中模块化引入的功能, 如@import url()
        options: {
          modules: true, // css模块化
          localIdentName: '[name]__[local]--[hash:base64:5]' // 定义css类名[文件名__原类名--5位数哈希值]
        }
      },{
        loader: 'postcss-loader' // 提供更多处理css的功能, 比如在postcss.config.js中添加插件：自动补齐兼容性前缀
      }]
    }]
  },
  plugins: [ // 插件相关
    new htmlWebpackPlugin({ // 自动创建html的插件, html会自动引入打包后的js和css
      template: __dirname + '/public/temp.html' // 以temp.html为模板
    })
  ]
}