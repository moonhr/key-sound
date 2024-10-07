interface Window {
  electron: {
    ipcRenderer: {
      on: (channel: string, listener: (...args: any[]) => void) => void;
      removeListener: (
        channel: string,
        listener: (...args: any[]) => void
      ) => void;
    };
  };
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.mp3" {
  const content: string;
  export default content;
}
