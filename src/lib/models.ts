/*

  The interfaces and classes contained in this file define the structure 
  of the components for each chan thread, board and catalog.

*/

interface Component {
  id: string
  node: HTMLElement
}

interface Content extends Component {
  fileUrl: string
}

interface Container extends Component {
  boardName: string
  content: Content[]
}

/*

  'FromNodeBase' abstract class declares the static method 'fromNode'
  that must be implemented in all the classes that extends from 'FromNodeBase' childs.

*/

abstract class FromNodeBase {
  public static fromNode(node: HTMLElement): FromNodeBase | null {
    return null;
  }
}

export abstract class ReplyBase extends FromNodeBase implements Content {

  id: string;
  fileUrl: string;
  node: HTMLElement;

  constructor(id: string, fileUrl: string, node: HTMLElement) {
    super();
    this.id = id;
    this.fileUrl = fileUrl;
    this.node = node;
  }
}

export abstract class ThreadBase extends FromNodeBase implements Content, Container {

  id: string;
  boardName: string;
  fileUrl: string;
  content: ReplyBase[];
  node: HTMLElement;

  constructor(id: string, boardName: string, fileUrl: string, content: ReplyBase[], node: HTMLElement) {
    super();
    this.id = id;
    this.boardName = boardName;
    this.fileUrl = fileUrl;
    this.content = content;
    this.node = node;
  }
}

export abstract class BoardBase extends FromNodeBase implements Container {

  id: string;
  boardName: string;
  content: ThreadBase[];
  node: HTMLElement;

  constructor(id: string, boardName: string, content: ThreadBase[], node: HTMLElement) {
    super();
    this.id = id;
    this.boardName = boardName;
    this.content = content;
    this.node = node;
  }
}