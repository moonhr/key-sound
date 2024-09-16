const electronConfigs = require("./webpack.electron.js");
const reactConfigs = require("./webpack.react.dev.js");

module.exports = [electronConfigs, reactConfigs];

// const path = require("path");
// const merge = require("webpack-merge");
// const webpack = require("webpack");

// // 모드에 따라 적절한 설정 파일을 가져옵니다.
// const isProduction = process.env.NODE_ENV === "production";

// // 각각의 설정 파일을 불러옵니다.
// const electronConfig = require("./webpack.electron.js");
// const reactConfig = isProduction
//   ? require("./webpack.react.prod.js")
//   : require("./webpack.react.dev.js");

// // Electron과 React 설정을 병합합니다.
// module.exports = [
//   merge(electronConfig, {
//     // Electron-specific configurations if needed
//   }),
//   merge(reactConfig, {
//     // React-specific configurations if needed
//   }),
// ];
