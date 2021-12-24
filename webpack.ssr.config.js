const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const createServerConfig = require("./scripts/createServerConfig");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const serverConfig = createServerConfig();

module.exports = {
  entry: serverConfig.entries,
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "/dist/server"),
    publicPath: "/",
    libraryTarget: "commonjs",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: ["last 2 version", "> 1%", "IOS 7"],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: () => [
                require("autoprefixer")({
                  overrideBrowserslist: ["last 2 version", "> 1%", "IOS 7"],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|webp|gif|gif_jpeg|gif_png|gif_jpg|gif_webp|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 15000,
            name: "images/[name].[hash:8].[ext]",
          },
        },
      },
      {
        test: /\.jsx?$/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    alias: {
      public: path.join(__dirname, "/public"),
    },
  },
  stats: "errors-only",
  plugins: [
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    ...serverConfig.plugins,
  ],
};
