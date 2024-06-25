const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/background.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "background.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devtool: "cheap-module-source-map", // Change the devtool option
};
