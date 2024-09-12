import { app, BrowserWindow, Tray, nativeImage } from "electron";
import * as path from "path";

let tray: Tray;
let menuWindow: BrowserWindow;

function createMenuWindow() {
  menuWindow = new BrowserWindow({
    width: 300,
    height: 400,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Next.js 앱의 경로를 지정합니다.
  const nextAppPath = path.join(__dirname, "");
  menuWindow.loadFile(nextAppPath);

  menuWindow.on("blur", () => {
    if (menuWindow && !menuWindow.webContents.isDevToolsOpened()) {
      menuWindow.hide();
    }
  });

  return menuWindow;
}

function toggleMenuWindow() {
  if (!menuWindow) {
    createMenuWindow();
  }

  if (menuWindow.isVisible()) {
    menuWindow.hide();
  } else {
    const trayBounds = tray.getBounds();
    const windowBounds = menuWindow.getBounds();

    // macOS에서는 상단바 아이콘 아래에 창을 위치시킵니다.
    const x = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );
    const y = Math.round(trayBounds.y + trayBounds.height);

    menuWindow.setPosition(x, y, false);
    menuWindow.show();
    menuWindow.focus();
  }
}

app.whenReady().then(() => {
  const iconPath = path.join(__dirname, "../main/assets/favicon.ico");
  const icon = nativeImage
    .createFromPath(iconPath)
    .resize({ width: 16, height: 16 });

  tray = new Tray(icon);
  tray.setToolTip("Next.js Menubar App");

  tray.on("click", toggleMenuWindow);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
