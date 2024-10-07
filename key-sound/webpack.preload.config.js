const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/preload.ts",
  target: "electron-preload",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "preload.js",
    path: path.resolve(__dirname, "dist"),
  },
};
