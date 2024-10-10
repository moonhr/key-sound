const path = require("path-browserify");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production", // production 모드로 설정
  entry: {
    main: "./src/main.ts",
  },
  target: "electron-main",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    usedExports: true,
  },
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
  optimization: {
    minimize: true, // 코드 최소화
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // console 로그 제거
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all", // 코드 분할
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"), // 환경 변수 설정
    }),
  ],
  cache: {
    type: "filesystem", // 빌드 캐시 활성화
  },
};
