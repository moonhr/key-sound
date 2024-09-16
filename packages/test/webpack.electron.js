const path = require("path");

module.exports = {
  // Build Mode
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  // Electron Entrypoint
  entry: "./src/main.ts",
  target: "electron-main",
  externals: {
    "electron-reload": "commonjs2 electron-reload",
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
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // Optional: Use this for faster builds
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
};
