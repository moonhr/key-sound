const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/public/renderer.tsx",
  },
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: /src/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(mp3|wav)$/, // mp3와 wav 파일을 처리
        type: "asset/resource",
        generator: {
          filename: "src/static/sound/[name][ext]", // 파일명을 해싱 없이 유지
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack", "url-loader"],
          },
          {
            type: "asset/resource", // 일반적으로 파일로 사용되는 경우
            generator: {
              filename: "src/static/svg/[name][ext]", // SVG 파일명을 해싱 없이 유지
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    filename: "[name].[contenthash].js", // 각 청크에 대해 고유한 이름을 생성
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      inject: "body",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
};
