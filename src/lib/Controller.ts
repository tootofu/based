import Downloader from './Downloader';
import FileData from '../utils/FileData'

import { blobToBase64, base64ToBlob } from '../utils/helpers';
import { Observer } from '../utils/observer';
import { saveAs } from 'file-saver';

export default class {

  private downloader: Downloader;
  
  constructor(o: Observer) {
    this.downloader = new Downloader(o);
  }

  public async downloadAndSave(fileData: FileData): Promise<void> {
    const fullFileName: string = `${fileData.name}.${fileData.extension}`;

    await this.downloader.downloadFromUrl(fileData.url)
            .then(file => saveAs(file, fullFileName));
  }

  public async downloadAndZIP(threadFileData: FileData[]): Promise<void> {

    for (const fileData of threadFileData) {
      const blob: Blob = await this.downloader.downloadFromUrl(fileData.url);
      fileData.format = blob.type;
      fileData.base64 =  await blobToBase64(blob) as string;
    }

    let message: Object = { type: 'zip', content: threadFileData };

    chrome.runtime.sendMessage(message, (response: string) => {
      
      base64ToBlob(response, 'application/zip')
        .then(blob => saveAs(blob as Blob, `${threadFileData[0].name}.zip`));
    
    })

  }
}
