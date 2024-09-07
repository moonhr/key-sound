import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from "electron";
import Store from "electron-store";

// Window 옵션 타입 정의
interface WindowOptions extends BrowserWindowConstructorOptions {
  width: number;
  height: number;
}

// Window 상태 타입 정의
interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
}

// createWindow 함수 정의
export const createWindow = (
  windowName: string,
  options: WindowOptions
): BrowserWindow => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store({ name });

  // 기본 사이즈
  const defaultSize: WindowState = {
    width: options.width,
    height: options.height,
    x: 0,
    y: 0,
  };

  let state: WindowState = { x: 0, y: 0, width: 0, height: 0 };

  // 저장된 상태 복원
  const restore = (): WindowState => store.get(key, defaultSize) as WindowState;

  // 현재 위치 및 크기 가져오기
  const getCurrentPosition = (): WindowState => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  // 윈도우가 화면 내에 있는지 확인
  const windowWithinBounds = (
    windowState: WindowState,
    bounds: Electron.Rectangle
  ): boolean => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  // 기본 위치로 재설정
  const resetToDefaults = (): WindowState => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return {
      ...defaultSize,
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    };
  };

  // 윈도우가 일부 화면에 보이도록 보장
  const ensureVisibleOnSomeDisplay = (
    windowState: WindowState
  ): WindowState => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      return resetToDefaults();
    }
    return windowState;
  };

  // 상태 저장
  const saveState = (): void => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  // BrowserWindow 인스턴스 생성
  const win = new BrowserWindow({
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      ...options.webPreferences,
    },
  });

  // 윈도우가 닫힐 때 상태 저장
  win.on("close", saveState);

  return win;
};
