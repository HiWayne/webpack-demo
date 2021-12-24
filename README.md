# webpack-demo （webpack 配置、优化、react SPA、服务端渲染）

### 这是一个 webpack5 的从零开始的配置

**包括了**：

1. babel(转译最新 es 标准和 react17)

2. 分包优化

3. 服务端渲染打包 & 服务端渲染 node 代码

4. css 抽离&压缩

5. 自动补齐 css 兼容性前缀

6. react devServer

7. 自动创建入口 HTML

8. 清除旧打包文件、

9. 编写多入口打包脚本等

> 开发环境配置：`webpack.development.config.js`

> 生产环境配置：`webpack.production.config.js`

> 服务端同构渲染环境配置：`webpack.ssr.config.js`

### 目录文件

```
  "/src"             // 源文件所在目录
  "/public"          // 静态资源所在目录
  "/dist"            // 打包目录
  "package.json"     // 整个项目的npm配置文件，可以声明项目名称、描述、版本，声明相关依赖，设置script命令等
  ".babelrc"         // babel配置文件，也可以options:{}的形式直接写在babel-loader处
  ".env"             // 环境配置，由dotenv解析
  "server-render.js" // 服务端渲染后端代码。SSR同构业务代码写法参考 Next.js
```

### 安装依赖

```
  npm i
```

### 开启『多 SPA 页面』本地 dev 服务

```
  npm run dev
```

本地 SPA 页面可以通过`localhost:9590`打开，默认打开`localhost:9590/cartoon`，由于是多 SPA 页面打包，可以通过不同路径去不同的 SPA

### 『多 SPA 页面』打包

```
  npm run build
```

### 开启 SSR 本地服务

```
  npm run server:start
```

本地 SSR 页面 可以通过`localhost:9591/*`打开，`*`代表不同页面的路由，路由又`/src/pages`下的组件目录决定，设计参考 React SSR 框架 `Next.js`

### SSR 打包

```
  npm run server:build
```
