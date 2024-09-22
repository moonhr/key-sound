import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

// 메인 프로세스의 IPC 기능을 안전하게 노출
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    on: (
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void
    ) => {
      ipcRenderer.on(channel, listener);
    },
    once: (
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void
    ) => {
      ipcRenderer.once(channel, listener);
    },
    removeListener: (
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void
    ) => {
      ipcRenderer.removeListener(channel, listener);
    },
  },
  globalAPI: global,
});
