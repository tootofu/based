import {  saveAs  } from 'file-saver';

import {  Observer, Observable, Notification  } from './utils/observer';

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
      throw new Error('Error at \'Saver.notify()\' method');
    }
  }

  public async saveFile(o: Observer, fileName: string, blob: Blob): Promise<void> {
    this.notify(o, {type: 'save', content: 'Saving...'});

    let error;
    try {
      saveAs(blob, fileName);
    } catch (e) {
      error = e;
      this.notify(o, {type: 'error', content: e});
    }

    if (!error) {
      this.notify(o, {type: 'success', content: 'Success!'});
    }
  }
}