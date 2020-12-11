import { Observable, Observer } from '../utils/observer'

export default class implements Observable {

  private observer: Observer;

  constructor(observer: Observer) {
    this.observer = observer;
  }

  notify() {
    this.observer.update();
  }
  
  public async downloadFromUrl(url: string): Promise<Blob> {
    const blob = await fetch(url).then(res => res.blob());
    this.notify();
    return blob;
  }
}