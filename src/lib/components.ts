/*

The interfaces and classes contained in this file define the structure 
of the components for each Chan thread, board and catalog.

*/

import FileData from '../utils/FileData';

/**/

interface Component {
  id: string;
  node: HTMLElement;
}

interface Content extends Component {
  fileData: FileData;
  renderPlace: HTMLElement;
}

interface Container extends Component {
  boardName: string;
  content: Content[];
}

/**/

export abstract class ReplyBase implements Content {

  id: string;
  fileData: FileData;
  node: HTMLElement;
  renderPlace: HTMLElement;

  constructor(id: string, fileData: FileData, node: HTMLElement, renderPlace: HTMLElement) {
    this.id = id;
    this.fileData = fileData;
    this.node = node;
    this.renderPlace = renderPlace;
  }
}

export abstract class ThreadBase implements Content, Container {

  id: string;
  boardName: string;
  fileData: FileData;
  content: ReplyBase[];
  node: HTMLElement;
  renderPlace: HTMLElement;

  constructor(id: string, boardName: string, fileData: FileData, content: ReplyBase[], node: HTMLElement, renderPlace: HTMLElement) {
    this.id = id;
    this.boardName = boardName;
    this.fileData = fileData;
    this.content = content;
    this.node = node;
    this.renderPlace = renderPlace;
  }
}

export abstract class BoardBase implements Container {

  id: string;
  boardName: string;
  content: ThreadBase[];
  node: HTMLElement;

  constructor(id: string, boardName: string, content: ThreadBase[], node: HTMLElement) {
    this.id = id;
    this.boardName = boardName;
    this.content = content;
    this.node = node;
  }
}
