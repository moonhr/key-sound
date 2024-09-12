const path = require("path");

module.exports = {
  // Build Mode
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  // Electron Entrypoint
  entry: "./src/main.ts",
  target: "electron-main",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
    "electron-reload": "commonjs2 electron-reload",
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    alias: {
      ["@"]: path.resolve(__dirname, "src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: "ts-loader" }],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
};
