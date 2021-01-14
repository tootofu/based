abstract class Button {

  public id: string;
  public element: HTMLButtonElement = document.createElement('button');

  constructor(id: string, textContent: string) {
    this.id = id;
    this.element.id = `based-${id}`;
    this.element.textContent = textContent;
    this.element.classList.add('based-button');
  }

  protected clickEventHandler(): void {
    this.element.disabled = true;
    this.element.textContent = 'Waiting...';
      
    if (this.element.classList.contains('based-button_error')) {
      this.element.classList.replace('based-button_error', 'based-button_progress');
      this.element.removeAttribute('tooltip');
      this.element.removeAttribute('flow');
    } else if (this.element.classList.contains('based-button')) {
      this.element.classList.replace('based-button', 'based-button_progress');
    }
  }

  public update(n: {type: string, payload: string}): void {
    switch (n.type) {
      case 'download':
      case 'zip':
      case 'save':
        this.element.textContent = n.payload;
        break;

      case 'progress':
        this.element.textContent = `Downloading: ${n.payload}`;
        break;

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
        this.element.setAttribute('tooltip', n.payload);
        this.element.setAttribute('flow', 'down');
        break;

      case 'error':
        this.element.disabled = false;
        this.element.textContent = '✗ Error! Try again';

        if (this.element.classList.contains('based-button')) {
          this.element.classList.replace('based-button', 'based-button_error');
        
        } else if (this.element.classList.contains('based-button_progress')) {
          this.element.classList.replace('based-button_progress', 'based-button_error');
        }

        this.element.setAttribute('tooltip', n.payload);
        this.element.setAttribute('flow', 'down');
        break;

      default:
        break;
    }
  }
}

export class DownloadButton extends Button {

  constructor(id: string) {
    super(id, 'Download file');
  }

  public bindDownload(handler: Function): void {
    this.element.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      this.clickEventHandler();

      handler(this.id);
    })
  }
}

export class ZipButton extends Button {

  constructor(id: string) {
    super(id, 'Download all as Zip');
  }

  public bindZip(handler: Function): void {
    this.element.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      this.clickEventHandler();
    
      handler(this.id);
    })
  }
}
