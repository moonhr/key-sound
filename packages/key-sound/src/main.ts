import {
  app,
  BrowserWindow,
  nativeImage,
  session,
  ipcMain,
  systemPreferences,
} from "electron";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config(); // .env 파일의 변수들을 process.env에 로드합니다.

let mainWindow: BrowserWindow;

//메인창 속성
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    frame: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
