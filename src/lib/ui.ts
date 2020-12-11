import Controller from './Controller';
import { FileData } from './components';
import { Observer } from '../utils/observer';

abstract class DownloadButtonBase implements Observer { 

  protected controller: Controller;
  public element: HTMLButtonElement = document.createElement('button');
  
  constructor(buttonText: string) {
    this.controller = new Controller(this);
    this.element.textContent = buttonText;
  }

  public update(): void {
    this.element.disabled = true;
  }
  
  protected abstract onClick(e: Event): void;
}

export class SingleButton extends DownloadButtonBase {

  public fileData: FileData;
  
  constructor(buttonText: string, fileData: FileData) {
    super(buttonText);
    this.fileData = fileData;
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  protected onClick(e: Event): void {
    e.preventDefault();
    this.controller.downloadAndSave(this.fileData);
  }
}

export class ZIPButton extends DownloadButtonBase {

  public threadFileData: FileData[];

  constructor(buttonText: string, threadFileData: FileData[]) {
    super(buttonText);
    this.threadFileData = threadFileData;
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  protected onClick(e: Event): void {
    e.preventDefault();
    this.controller.downloadAndZIP(this.threadFileData);
  }
}