const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const createMultipleEntryConfig = require("./scripts/createMultipleEntryConfig");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
require("dotenv").config();

const multipleEntryConfig = createMultipleEntryConfig();

module.exports = {
  entry: multipleEntryConfig.entries,
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.join(__dirname, "/dist"),
  },
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
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
          "style-loader",
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
  devServer: {
    host: process.env.HOST,
    port: process.env.FRONTEND_PORT,
    open: "cartoon.html",
    static: {
      directory: path.join(__dirname, "/public"),
    },
  },
  resolve: {
    alias: {
      public: path.join(__dirname, "/public"),
    },
  },
  stats: "errors-only",
  plugins: [
    ...multipleEntryConfig.plugins,
    new friendlyErrorsWebpackPlugin(),
  ],
};
