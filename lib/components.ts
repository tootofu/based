/*

The interfaces and classes contained in this file define the structure 
of the components for each Chan thread, board and catalog.

*/

import FileData from './utils/FileData';

/**/

interface Component {
  id: string;
  node: HTMLElement;
}

interface Content extends Component {
  fileData: FileData | null;
  renderPlace: HTMLElement  | null;
}

interface Container extends Component {
  content: Content[];
}

/**/

export abstract class ReplyBase implements Content {

  public node: HTMLElement;
  public id: string;
  public renderPlace: HTMLElement | null;
  public fileData: FileData | null;

  constructor(node: HTMLElement) {
    this.node = node;
    this.id = this.setId(this.node);
    this.renderPlace = this.setRenderPlace(this.node);
    this.fileData = this.setFileData(this.id, this.node);
  }

  protected abstract setId(node: HTMLElement): string;
  protected abstract setRenderPlace(node: HTMLElement): HTMLElement | null;
  protected abstract setFileData(id: string, node: HTMLElement): FileData | null;
}

export abstract class ThreadBase implements Content, Container {

  public node: HTMLElement;
  public id: string;
  public renderPlace: HTMLElement | null;
  public fileData: FileData | null;
  public content: ReplyBase[];

  constructor(node: HTMLElement) {
    this.node = node;
    this.id = this.setId(this.node);
    this.renderPlace = this.setRenderPlace(this.node);
    this.fileData = this.setFileData(this.id, this.node);
    this.content = this.setContent(this.node);
  }

  protected abstract setId(node: HTMLElement): string;
  protected abstract setRenderPlace(node: HTMLElement): HTMLElement | null;
  protected abstract setContent(node: HTMLElement): ReplyBase[];
  protected abstract setFileData(id: string, node: HTMLElement): FileData | null;
}
