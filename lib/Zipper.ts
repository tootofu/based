const JSZIP = require('jszip');

export default class {

  constructor() {};

  public async generateZipFile(files: {fileName: string, blob: Blob}[]): Promise<Blob> {
    const zip = new JSZIP();

    for (const file of files) {
      zip.file(file.fileName, file.blob, {binary: true});
    }

    const zipped = await zip.generateAsync({type: 'blob'})
                         .catch((err: Error) => {throw err})
    
    return zipped;
  }
}
