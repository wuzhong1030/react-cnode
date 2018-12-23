const path = require("path");

module.exports = {
  target: "node",
  entry: {
    app: path.join(__dirname, "../client/server-entry.js")
  },
  output: {
    filename: "server-entry.js",
    path: path.join(__dirname, "../dist"),
    publicPath: "public",
    libraryTarget: "commonjs2"
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
