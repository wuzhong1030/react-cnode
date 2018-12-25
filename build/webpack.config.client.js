const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const baseConfig = require("./webpack.config.base");

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, "../client/app.js")
  },
  output: {
    filename: "[name].[hash:5].js"
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "../client/index.html"),
      filename: "index.html"
    }),
    new htmlWebpackPlugin({
      template:
        "!!ejs-compiled-loader!" +
        path.join(__dirname, "../client/server.tpl.ejs"),
      filename: "server.ejs"
    })
  ]
});

if (isDev) {
  config.entry = [
    "react-hot-loader/patch",
    path.join(__dirname, "../client/app.js")
  ];
  config.devServer = {
    host: "localhost",
    port: 8888,
    hot: true,
    contentBase: path.join(__dirname, "../dist"),
    overlay: {
      error: true
    },
    publicPath: "/public/",
    historyApiFallback: {
      index: "/public/index.html"
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
