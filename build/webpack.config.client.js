const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

const config = {
  entry: {
    app: path.join(__dirname, "../client/app.js")
  },
  output: {
    filename: "[name].[hash:5].js",
    path: path.join(__dirname, "../dist"),
    publicPath: "public"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "../client/index.html"),
      filename: "index.html"
    })
  ]
};

if (isDev) {
  config.devServer = {
    host: "0.0.0.0",
    port: 8888,
    // hot: true,
    contentBase: path.join(__dirname, "../dist"),
    overlay: {
      error: true
    },
    publicPath: "/public",
    historyApiFallback: {
      index: "/public/index.html"
    }
  };
}

module.exports = config;
