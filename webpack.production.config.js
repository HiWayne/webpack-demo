const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const createMultipleEntryConfig = require("./scripts/createMultipleEntryConfig");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const multipleEntryConfig = createMultipleEntryConfig();
console.log(multipleEntryConfig)

module.exports = {
  entry: multipleEntryConfig.entries,
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.join(__dirname, "/dist"),
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
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendors",
      minSize: 10000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  stats: "errors-only",
  plugins: [
    new CleanWebpackPlugin(),
    ...multipleEntryConfig.plugins,
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new CssMinimizerPlugin({
      include: /\.css$/,
    }),
    new friendlyErrorsWebpackPlugin(),
  ],
};
