import { Observable, Observer } from '../utils/observer'

export default class implements Observable {

  private corsProxy: string = 'https://cors-anywhere.herokuapp.com/';
  private observer: Observer;

  constructor(observer: Observer) {
    this.observer = observer;
  }

  notify() {
    this.observer.update();
  }
  
  public async downloadFromUrl(url: string): Promise<Blob> {
    const blob = await fetch(this.corsProxy + url).then(res => res.blob());
    this.notify();
    return blob;
  }
}