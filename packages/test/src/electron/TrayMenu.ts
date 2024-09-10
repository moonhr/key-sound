import { app, Tray, Menu, nativeImage } from "electron";
import * as path from "path";

export class TrayMenu {
  public readonly tray: Tray;
  private iconPath: string;

  constructor() {
    this.iconPath = this.getIconPath();
    this.tray = new Tray(this.createNativeImage());
  }

  private getIconPath(): string {
    if (process.env.NODE_ENV === "development") {
      return path.join(process.cwd(), "src", "assets", "icon.webp");
    } else {
      return path.join(app.getAppPath(), "assets", "icon.webp");
    }
  }

  createNativeImage() {
    const image = nativeImage.createFromPath(this.iconPath);
    image.setTemplateImage(true);
    return image;
  }
}