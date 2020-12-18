/*                                     */
/*    \__(° w U)__?    <-- A pirate?   */
/*                                     */

const JSZIP = require('jszip');
import FileData from './utils/FileData';

import { Observer, Observable, Notification } from './utils/observer';

export default class implements Observable {

  private observers: Observer[] = [];

  constructor() {};

  public attach(o: Observer): void {
    this.observers.push(o);
  }

  public notify(otf: Observer, n: Notification): void {
    // otf === observer to find :v
    const observer: Observer | undefined = this.observers.find(o => o == otf);
    if (observer) {
      observer.update(n);
    } else {
      throw new Error('Error at \'Zipper.notify()\' method');
    }
  }

  public async generateZipFile(o: Observer, fileDataArray: FileData[]): Promise<Blob|void> {
    const zip = new JSZIP();

    for (const fileData of fileDataArray) {
      zip.file(fileData.fileName, fileData.blob, {binary: true});
    }
    
    this.notify(o, {type: 'zip', content: 'Generating Zip file...'});

    const zipped = await zip.generateAsync({type: 'blob'});
    return zipped;
  }
}
