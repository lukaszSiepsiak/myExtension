const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/background.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "background.bundle.js",
  },
};
