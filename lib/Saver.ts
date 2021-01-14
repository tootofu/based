import { saveAs } from 'file-saver';

export default class {

  constructor() {};

  public async saveFile(blob: Blob, fileName: string): Promise<void> {
    try {
      saveAs(blob, fileName);
    } catch (err) {
      throw new Error(`Saver.saveFile() error: ${err}`)
    }
  }
}