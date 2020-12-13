import Controller from './Controller';
import FileData from '../utils/FileData';

import { Observer } from '../utils/observer';

abstract class DownloadButtonBase implements Observer { 

  protected controller: Controller;
  public element: HTMLButtonElement = document.createElement('button');
  
  constructor() {
    this.controller = new Controller(this);
  }

  public update(): void {
    this.element.disabled = true;
  }
  
  protected abstract onClick(e: Event): void;
}

export class SingleButton extends DownloadButtonBase {

  public fileData: FileData;
  
  constructor(fileData: FileData) {
    super();
    this.element.textContent = 'Download file';
    this.element.addEventListener('click', this.onClick.bind(this));
    this.fileData = fileData;
  }

  protected onClick(e: Event): void {
    e.preventDefault();
    this.controller.downloadAndSave(this.fileData);
  }
}

export class ZIPButton extends DownloadButtonBase {

  public threadFileData: FileData[];

  constructor(threadFileData: FileData[]) {
    super();
    this.element.textContent = 'Download all as ZIP';
    this.element.addEventListener('click', this.onClick.bind(this));
    this.threadFileData = threadFileData;
  }

  protected onClick(e: Event): void {
    e.preventDefault();
    this.controller.downloadAndZIP(this.threadFileData);
  }
}
