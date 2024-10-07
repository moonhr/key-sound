const path = require("path-browserify");
// const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.ts",
  },
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [],
};
