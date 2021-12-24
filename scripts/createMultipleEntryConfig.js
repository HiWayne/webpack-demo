const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (rootPath = path.join(__dirname, "../src/**/index.js")) => {
  let entries, plugins;
  const nameRegExp = /(?<=\/)[^\/]+(?=\/index\.js$)/;
  entries = glob.sync(rootPath).reduce((entry, path) => {
    // pages里是ssr同构的组件
    if (/\/pages\//i.test(path)) {
      return entry;
    }
    // path = /**/webpack-demo/src/cartoon/index.js
    const match = path.match(nameRegExp);
    // match = [
    //   'cartoon',
    //   index: 44,
    //   input: '/**/webpack-demo/src/cartoon/index.js',
    //   groups: undefined
    // ]
    const name = match && match[0];
    if (name) {
      entry[name] = path;
    }
    return entry;
  }, {});

  plugins = Reflect.ownKeys(entries).map((entry) => {
    return new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      chunks: ["vendors", entry],
      filename: `${entry}.html`,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    });
  });

  return {
    entries,
    plugins,
  };
};
