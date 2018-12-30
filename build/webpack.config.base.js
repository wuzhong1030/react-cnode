const path = require("path");
module.exports = {
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: "flie-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  }
};
