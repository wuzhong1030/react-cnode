const path = require("path");

module.exports = {
  entry: {
    app: path.join(__dirname, "../client/app.js")
  },
  output: {
    filename: "[name].[hash:5].js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/public"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
