/*

The interfaces and classes contained in this file define the structure 
of the components for each chan post, board and catalog.

*/

interface Component {
  id: string;
  node: HTMLElement;
}

interface Content extends Component {
  fileUrl: string | null;
  renderPlace: HTMLElement | null;
}

interface Container extends Component {
  content: Content[];
}

export abstract class Reply implements Content {

  public node: HTMLElement;
  public id: string;
  public fileUrl: string | null;
  public renderPlace: HTMLElement | null;

  constructor(node: HTMLElement) {
    this.node = node;
    this.id = this.getId(this.node);
    this.renderPlace = this.getRenderPlace(this.node);
    this.fileUrl = this.getFileUrl(this.id, this.node);
  }

  protected abstract getId(node: HTMLElement): string;
  protected abstract getRenderPlace(node: HTMLElement): HTMLElement | null;
  protected abstract getFileUrl(id: string, node: HTMLElement): string | null;
}

export abstract class Post implements Content, Container {

  public node: HTMLElement;
  public id: string;
  public fileUrl: string | null;
  public content: Reply[];
  public renderPlace: HTMLElement | null;

  constructor(node: HTMLElement) {
    this.node = node;
    this.id = this.getId(this.node);
    this.renderPlace = this.getRenderPlace(this.node);
    this.fileUrl = this.getFileUrl(this.id, this.node);
    this.content = this.getContent(this.node);
  }

  protected abstract getId(node: HTMLElement): string;
  protected abstract getRenderPlace(node: HTMLElement): HTMLElement | null;
  protected abstract getFileUrl(id: string, node: HTMLElement): string | null;
  protected abstract getContent(node: HTMLElement): Reply[];
}
