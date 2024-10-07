interface Window {
  electronAPI: {
    closeApp: () => void;
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
