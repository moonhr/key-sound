/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar electron_1 = __webpack_require__(/*! electron */ \"electron\");\n// import { TrayMenu } from \"./electron/TrayMenu\";\nvar path = __importStar(__webpack_require__(/*! path */ \"path\"));\nvar tray;\nvar menuWindow;\nfunction createMenuWindow() {\n    menuWindow = new electron_1.BrowserWindow({\n        width: 300,\n        height: 400,\n        frame: false,\n        resizable: false,\n        show: false,\n        webPreferences: {\n            nodeIntegration: true,\n            contextIsolation: false,\n        },\n    });\n    // Next.js 앱의 경로를 지정합니다.\n    // const nextAppPath = path.join(__dirname, \"index.html\");\n    // menuWindow.loadFile(nextAppPath);\n    if (true) {\n        menuWindow.loadURL(\"http://localhost:9000\"); // React 개발 서버 주소\n    }\n    else { var nextAppPath; }\n    menuWindow.on(\"blur\", function () {\n        if (menuWindow && !menuWindow.webContents.isDevToolsOpened()) {\n            menuWindow.hide();\n        }\n    });\n    return menuWindow;\n}\nfunction toggleMenuWindow() {\n    if (!menuWindow) {\n        createMenuWindow();\n    }\n    if (menuWindow.isVisible()) {\n        menuWindow.hide();\n    }\n    else {\n        var trayBounds = tray.getBounds();\n        var windowBounds = menuWindow.getBounds();\n        // macOS에서는 상단바 아이콘 아래에 창을 위치시킵니다.\n        var x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);\n        var y = Math.round(trayBounds.y + trayBounds.height);\n        menuWindow.setPosition(x, y, false);\n        menuWindow.show();\n        menuWindow.focus();\n    }\n}\nelectron_1.app.whenReady().then(function () {\n    var iconPath = path.join(__dirname, \"./assets/icon.webp\");\n    var icon = electron_1.nativeImage\n        .createFromPath(iconPath)\n        .resize({ width: 16, height: 16 });\n    tray = new electron_1.Tray(icon);\n    tray.setToolTip(\"Next.js Menubar App\");\n    tray.on(\"click\", toggleMenuWindow);\n});\nelectron_1.app.on(\"window-all-closed\", function () {\n    if (process.platform !== \"darwin\") {\n        electron_1.app.quit();\n    }\n});\n\n\n//# sourceURL=webpack://test/./src/main.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
