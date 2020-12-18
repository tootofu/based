import Controller from '../Controller';
import FileData from '../utils/FileData';

import { Observer, Notification } from '../utils/observer';

abstract class DownloadButtonBase implements Observer { 

  protected controller: Controller;
  public element: HTMLButtonElement = document.createElement('button');
  
  constructor() {
    this.element.classList.add('based-button');
    this.controller = Controller.SingletonConstructor(this);
  }

  public update(n: Notification): void {
    switch (n.type) {

      case 'success':
        this.element.textContent = '✓';

        if (this.element.classList.contains('based-button')) {
          this.element.classList.replace('based-button', 'based-button_success');
        
        } else if (this.element.classList.contains('based-button_progress')) {
          this.element.classList.replace('based-button_progress', 'based-button_success');
        
        } else if (this.element.classList.contains('based-button_error')) {
          this.element.classList.replace('based-button_error', 'based-button_success');
        }

        this.element.classList.replace('based-button', 'based-button_success');
        this.element.setAttribute('tooltip', n.content);
        this.element.setAttribute('flow', 'down');
        break;

      case 'download':
      case 'progress':
      case 'zip':
      case 'save':
        this.element.textContent = n.content;
        break;

      case 'error':
        this.element.disabled = false;
        this.element.textContent = '✗ Error! Try again';

        if (this.element.classList.contains('based-button')) {
          this.element.classList.replace('based-button', 'based-button_error');
        
        } else if (this.element.classList.contains('based-button_progress')) {
          this.element.classList.replace('based-button_progress', 'based-button_error');
        }

        this.element.setAttribute('tooltip', n.content);
        this.element.setAttribute('flow', 'down');
        break;

      default:
        break;
    }
  }
  
  protected abstract onClick(e: Event): void;
}

export class SingleButton extends DownloadButtonBase {

  public fileData: FileData;
  
  constructor(fileData: FileData) {
    super();
    this.fileData = fileData;
    this.element.textContent = 'Download file';
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  protected onClick(e: Event): void {
    e.preventDefault();
    this.element.disabled = true;
    this.element.textContent = 'Waiting...';
    
    if (this.element.classList.contains('based-button_error')) {
      this.element.classList.replace('based-button_error', 'based-button_progress');
      this.element.removeAttribute('tooltip');
      this.element.removeAttribute('flow');
    } else if (this.element.classList.contains('based-button')) {
      this.element.classList.replace('based-button', 'based-button_progress');
    }
    
    this.controller.downloadAndSave(this, this.fileData);
  }
}

export class ZIPButton extends DownloadButtonBase {

  public threadFileData: FileData[];

  constructor(threadFileData: FileData[]) {
    super();
    this.threadFileData = threadFileData;
    this.element.textContent = 'Download all as Zip';
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  protected onClick(e: Event): void {
    e.preventDefault();
    this.element.disabled = true;
    this.element.textContent = 'Waiting...';

    if (this.element.classList.contains('based-button_error')) {
      this.element.classList.replace('based-button_error', 'based-button_progress');
      this.element.removeAttribute('tooltip');
      this.element.removeAttribute('flow');
    } else if (this.element.classList.contains('based-button')) {
      this.element.classList.replace('based-button', 'based-button_progress');
    }

    this.controller.downloadAndZIP(this, this.threadFileData);
  }
}
