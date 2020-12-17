import Downloader from './Downloader';
import FileData from './utils/FileData';
import Zipper from './Zipper';

import { Observer } from './utils/observer';
import { saveAs } from 'file-saver';

export default class Controller {

  private static instance: Controller;
  private downloader: Downloader = new Downloader();
  private zipper: Zipper = new Zipper();
  
  private constructor() {};

  public static SingletonConstructor(o: Observer) {
    if (!Controller.instance) {
      Controller.instance = new Controller();
    }

    Controller.instance.downloader.attach(o);

    if (o.id == '0') {
      Controller.instance.zipper.attach(o);
    }

    return Controller.instance;
  }

  public async downloadAndSave(o: Observer, fileData: FileData): Promise<void> {
    await this.downloader.download(o, fileData.url)
            .then(file => {
              if (file) {
                saveAs(file, fileData.fileName);
              }
            });

  }

  public async downloadAndZIP(o: Observer, threadFileData: FileData[]): Promise<void> {

    const urlArray: string[] = threadFileData.map(fileData => fileData.url);
    const blobArray: Blob[] | void = await this.downloader.multipleDownload(o, urlArray);

    if (blobArray) {
      for (let i = 0; i < threadFileData.length; i++) {
        threadFileData[i].type = blobArray[i].type;
        threadFileData[i].blob = blobArray[i];
      }
  
      await this.zipper.generateZipFile(o, threadFileData)
              .then((zip: any) => saveAs(zip, `${threadFileData[0].id}.zip`));
    }
  }
}
