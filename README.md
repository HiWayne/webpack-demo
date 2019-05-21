# webpack4-demo
### 这是一个webpack4.x的从零开始的配置，并带有详细注释<br/>
包括了babel(转译最新es标准和react)，模块化css，自动补齐css兼容性前缀，css与js分离，自动创建HTML，清除旧打包文件等插件<br/>
开发环境的配置：webpack.config.js<br/>
生产环境的配置：webpack.production.config.js<br/>
### 目录文件
```
  /src: 开发时的源文件所在目录
  /public: 模板HTML所在目录
  /dist: 打包路径
  package.json: 整个项目的配置文件，可以声明项目名称、描述、版本，声明相关依赖，设置script命令等
  .babelrc: babel配置文件，也可以options:{}的形式直接写在webpack配置文件的babel处
  postcss.config.js: postcss-loader配置文件
```
### 安装依赖
```
  npm install
```
### 开启本地服务器
```
  npm run serve
```
### 打包
```
  npm run build
```