import Downloader from './Downloader';
import FileData from './utils/FileData';
import Saver from './Saver';
import Zipper from './Zipper';

import { Observer } from './utils/observer';

export default class Controller {

  private static instance: Controller;
  private downloader: Downloader = new Downloader();
  private saver: Saver = new Saver();
  private zipper: Zipper = new Zipper();
  
  private constructor() {};

  public static SingletonConstructor(o: Observer) {
    if (!Controller.instance) {
      Controller.instance = new Controller();
    }

    Controller.instance.downloader.attach(o);
    Controller.instance.saver.attach(o);
    Controller.instance.zipper.attach(o);

    return Controller.instance;
  }

  public async downloadAndSave(o: Observer, fileData: FileData): Promise<void> {
    await this.downloader.download(o, fileData.url)
            .then((blob: Blob|void) => {
              if (blob) {
                this.saver.saveFile(o, fileData.fileName, blob);
              }
            })
            .catch(e => console.error(`Error at 'Controller.downloadAndSave' method: ${e}`));
  }

  public async downloadAndZIP(o: Observer, fileDataArray: FileData[]): Promise<void> {

    const urlArray: string[] = fileDataArray.map(fileData => fileData.url);
    const blobArray: Blob[] | void = await this.downloader.multipleDownload(o, urlArray);

    if (blobArray) {
      for (let i = 0; i < fileDataArray.length; i++) {
        fileDataArray[i].type = blobArray[i].type;
        fileDataArray[i].blob = blobArray[i];
      }
  
      await this.zipper.generateZipFile(o, fileDataArray)
              .then((zip: Blob|void) => {
                if (zip) {
                  this.saver.saveFile(o, `${fileDataArray[0].id}.zip`, zip);
                }
              })
              .catch(e => console.error(`Error at 'Controller.downloadAndZip' method: ${e}`));;
    }
  }
}
