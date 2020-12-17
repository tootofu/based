

/*                                     */
/*    \__(° w U)__?    <-- A pirate    */
/*                                     */


const JSZIP = require('jszip');
import FileData from './utils/FileData';

import { Observer, Observable } from './utils/observer';

export default class implements Observable {

  private observers: Observer[] = [];

  constructor() {};

  attach(o: Observer): void {
    this.observers.push(o);
  }

  notify(otf: Observer, type: string , content: string): void {
    // otf === observer to find
    const observer: Observer | undefined = this.observers.find(o => o == otf);
    if (observer) {
      observer.update(type, content);
    } else {
      throw new Error('Error at \'Zipper.notify()\' method');
    }
  }

  public async generateZipFile(o: Observer, fileDataArray: FileData[]): Promise<Blob|void> {
    const zip = new JSZIP();

    for (const fileData of fileDataArray) {
      zip.file(fileData.fileName, fileData.blob, {binary: true});
    }
    
    this.notify(o, 'zip', 'Generating Zip file...');

    const zipped = await zip.generateAsync({type: 'blob'});

    this.notify(o, 'success', 'Success!');
    return zipped;
  }
}