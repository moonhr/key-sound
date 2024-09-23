import {
  app,
  BrowserWindow,
  Tray,
  nativeImage,
  session,
  ipcMain,
  globalShortcut,
} from "electron";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config(); // .env 파일의 변수들을 process.env에 로드합니다.

let tray: Tray;
let menuWindow: BrowserWindow;

function createMenuWindow() {
  menuWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    menuWindow.loadFile(path.join(__dirname, "index.html"));
    // menuWindow.loadURL("http://localhost:8080");
    menuWindow.webContents.openDevTools();
  } else {
    menuWindow.loadFile(path.join(__dirname, "index.html"));
    menuWindow.webContents.openDevTools();
  }

  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       "Content-Security-Policy": [
  //         "default-src 'self';",
  //         "script-src 'self' 'unsafe-inline';",
  //         "style-src 'self' 'unsafe-inline';",
  //         "img-src 'self' data:;",
  //         "font-src 'self';",
  //         "connect-src 'self';",
  //         "frame-src 'self';",
  //         "media-src 'self';",
  //         "object-src 'none';",
  //       ].join(" "),
  //     },
  //   });
  // });

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
  const iconPath = path.join(__dirname, "./assets/icon.webp");
  const icon = nativeImage
    .createFromPath(iconPath)
    .resize({ width: 16, height: 16 });

  tray = new Tray(icon);
  tray.setToolTip("Next.js Menubar App");

  tray.on("click", toggleMenuWindow);

  // 알파벳과 숫자 배열 생성
  const keys = [
    ..."abcdefghijklmnopqrstuvwxyz".split(""), // a-z 알파벳
    ..."0123456789".split(""), // 0-9 숫자
  ];

  // 각 키에 대해 globalShortcut 등록
  keys.forEach((key) => {
    globalShortcut.register(key, () => {
      console.log(`Server global key pressed: ${key}`);
      menuWindow.webContents.send("key-pressed", key); // 렌더러 프로세스로 키 이벤트 전송
    });
  });
});

app.on("window-all-closed", () => {
  // ioHook.unload();
  if (process.platform !== "darwin") {
    app.quit();
  }
});
