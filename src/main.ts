import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow;

//메인창 속성
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    frame: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  //개발자모드
  // mainWindow.webContents.openDevTools();
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

ipcMain.on("close-app", () => {
  app.quit();
});
