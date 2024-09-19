const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/public/renderer.tsx",
  target: "web",
  resolve: {
    fallback: {
      fs: false, // 브라우저에서는 fs 모듈이 필요 없으므로 false 처리
      path: require.resolve("path-browserify"), // path 모듈을 path-browserify로 대체
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/, // mp3와 wav 파일을 처리
        type: "asset/resource",
        generator: {
          filename: "static/sound/[name][ext]", // 파일명을 해싱 없이 유지
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/, // svg 파일 처리
        oneOf: [
          {
            issuer: /\.[jt]sx?$/, // JS, TSX 파일에서 사용하는 경우
            use: ["@svgr/webpack", "url-loader"],
          },
          {
            type: "asset/resource", // 일반적으로 파일로 사용되는 경우
            use: "file-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "renderer.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
};
