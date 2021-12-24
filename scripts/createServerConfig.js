const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const createServerConfig = () => {
  let entries, plugins;
  entries = glob
    .sync(path.join(__dirname, "../src/pages/**/*.js"))
    .reduce((entry, path) => {
      /**
       * nameRegExp.exec[0]:
       * /pages/index.js   -> index
       * /pages/a/index.js -> a
       * /pages/b.js       -> b
       * /pages/c/d.js     -> d
       **/
      const nameRegExp =
        /(?<=\/pages\/)index(?=\.js$)|(?<=\/)[^\/]+(?=(?<!pages)\/index\.js$)|(?<=\/)[^\/]+(?=(?<!index)\.js$)/i;

      const match = path.match(nameRegExp);
      const name = match && match[0];
      if (name) {
        entry[name] = path;
      }
      return entry;
    }, {});

  plugins = Reflect.ownKeys(entries).map((entry) => {
    return new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.server.html"),
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

module.exports = createServerConfig;
