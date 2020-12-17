import { Observable, Observer } from './utils/observer'

export default class implements Observable {

  private allowed: RegExp[] = [
    /https:\/\/([a-z]*\.)?(4chan|4channel)\.org/i,
    /https:\/\/www.(hispachan|hispasexy).org/i,
  ]

  private corsProxy: string = 'https://cors-anywhere.herokuapp.com/';
  private observers: Observer[] = [];

  constructor() {}

  attach(o: Observer): void {
    this.observers.push(o);
  }

  notify(otf: Observer, type: string , content: string): void {
    // otf === observer to find :v
    const observer: Observer | undefined = this.observers.find(o => o == otf);
    if (observer) {
      observer.update(type, content);
    } else {
      throw new Error('Error at \'Downloader.notify()\' method');
    }
  }

  private async corsRequiered(url: string): Promise<boolean> {
    const result: boolean = this.allowed.some(regex => regex.test(url));
    return !result;
  }
  
  public async download(o: Observer, url: string): Promise<Blob|void> {

    const blob = await this.corsRequiered(url)
                         .then(result => result ? this.corsProxy + url : url)
                         .then(url => {
                           this.notify(o, 'downloading', 'Downloading...');
                           return url;
                         })
                         .then(fetch)
                         .then(res => res.blob())
                         .catch((error) => {
                           this.notify(o,'error', error);
                         });

    if (blob) {
      this.notify(o, 'success', 'Success!');
      return blob;
    }
  }

  public async multipleDownload(o: Observer, urlArray: string[]): Promise<Blob[]|void> {
    const blobArray: Blob[] = [];

    let promiseError;
    for (const url of urlArray) {
      await this.corsRequiered(url)
              .then(result => result ? this.corsProxy + url : url)
              .then(fetch)
              .then(res => res.blob())
              .then(blob => {
                blobArray.push(blob);
                const message = `Downloading: ${blobArray.length}/${urlArray.length}`;
                this.notify(o, 'progress', message);
              })
              .catch((error) => {
                this.notify(o,'error', error);
                promiseError = error;
              });

      if (promiseError) {
        this.notify(o,'error', promiseError);
        break;
      }
    }

    if (!promiseError) {
      return blobArray;
    }
  }
}