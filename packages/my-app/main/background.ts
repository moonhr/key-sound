import { app, BrowserWindow, Tray, Menu, nativeImage } from "electron";
import * as path from "path";

// 환경 변수 설정
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

let tray;

app.whenReady().then(() => {
  // 이미지 파일 경로 설정
  const iconPath = path.join(process.resourcesPath, "assets", "logo.png"); // nativeImage 객체 생성
  const icon = nativeImage.createFromPath(iconPath);
  // 트레이 아이콘 생성
  tray = new Tray(icon);
  // 컨텍스트 메뉴 생성
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
  ]);

  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
