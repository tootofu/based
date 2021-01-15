import { DownloadButton, ZipButton } from './ui/buttons';
import { Observer, Notification } from './utils/observer';

export default class implements Observer {

  public zipButton: ZipButton;
  public downloadButtons: DownloadButton[];

  constructor(zipButton: ZipButton, downloadButtons: DownloadButton[]) {
    this.zipButton = zipButton;
    this.downloadButtons = downloadButtons;
  }

  public update(n: Notification): void {
    const notification = {type: n.type, payload: n.payload};

    if (n.target) {
      if (n.target == this.zipButton.id) this.zipButton.update(notification);
      else this.downloadButtons.forEach((button) => {if (button.id == n.target) button.update(notification)});
    } else {
      this.zipButton.update(notification);
    }
  }

  public bindDownload(handler: Function): void {
    this.downloadButtons.forEach((button) => {
      button.bindDownload(handler);
    })
  }

  public bindZip(handler: Function): void {
    this.zipButton.bindZip(handler);
  }
}