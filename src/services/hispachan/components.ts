import FileData from '../../utils/FileData';

import {  ReplyBase, ThreadBase, BoardBase } from '../../lib/components'

class Reply extends ReplyBase {
  constructor(id: string, fileData: FileData, node: HTMLElement, renderPlace: HTMLElement) {
    super(id, fileData, node, renderPlace);
  }

  public static fromNode(node: HTMLElement): Reply | null {
    // getting reply id
    const replyId: string = node.id.match(/\d+$/g)![0];
    // getting file URL
    const referenceElement: HTMLElement = node.querySelector('.filesize') as HTMLElement;
    
    if (replyId && referenceElement) {
      const referenceParent: HTMLElement = referenceElement.parentElement as HTMLElement;
      const fileElement: HTMLAnchorElement  = referenceParent!.querySelector('a') as HTMLAnchorElement;
      
      if (fileElement && fileElement.target) {
        const replyFileUrl: string = fileElement.href;
        
        const replyFileData: FileData = {
          url: replyFileUrl,
          name: replyId,
          extension: replyFileUrl.match(/[a-z0-9]*$/g)![0]
        }

        const renderPlace: HTMLElement = node.querySelector('.reflink') as HTMLElement;

        return new Reply(replyId, replyFileData, node, renderPlace);
      }
    }

    return null;
  }
}

export class Thread extends ThreadBase {
  constructor(id: string, board: string, fileData: FileData, content: Reply[], node: HTMLElement, renderPlace: HTMLElement) {
    super(id, board, fileData, content, node, renderPlace);
  }

  public static fromNode(node: HTMLElement): Thread | null {
    const nodeId: string = node.id;

    // getting thread id
    const threadId: string = nodeId.match(/\d+/g)![0];
    // getting board name
    const boardName: string = nodeId.match(/\D[a-z]*$/g)![0];
    // getting thread URL
    const threadUrl: string = `https://www.hispachan.org/${boardName}/res/${threadId}.html`; // useless
    // getting thread file URL
    const referenceElement: HTMLSpanElement = node.querySelector('.filesize') as HTMLSpanElement;
    const fileElement: HTMLAnchorElement = referenceElement!.firstElementChild as HTMLAnchorElement;
    const threadFileUrl: string = fileElement.href;

    const threadFileData: FileData = {
      url: threadFileUrl,
      name: threadId,
      extension: threadFileUrl.match(/[a-z0-9]*$/g)![0]
    }

    // getting thread replies
    const replyNodes: HTMLElement[] = [...node.querySelectorAll('.reply')] as HTMLElement[];
    const threadReplies: Reply[] = [];

    replyNodes.forEach((replyNode: HTMLElement) => {
      const reply: Reply | null = Reply.fromNode(replyNode) as Reply;

      if (reply) {
        threadReplies.push(reply);
      }
    })

    const renderPlace: HTMLElement = node.querySelector('.reflink') as HTMLElement;

    return new Thread(threadId, boardName, threadFileData, threadReplies, node, renderPlace);
  }
}

export class Board extends BoardBase {
  constructor(id: string, boardName: string, content: Thread[], node: HTMLElement) {
    super(id, boardName, content, node);
  }

  public static fromNode(node: HTMLElement): Board | null {
    const id: string = ''; // useless
    const boardName: string = ''; // useless

    // getting threads from board
    const threadNodes: HTMLElement[] = [...node.querySelectorAll('.thread')] as HTMLElement[];
    const boardThreads: Thread[] = [];

    threadNodes.forEach((threadNode: HTMLElement) => {
      const thread: Thread | null = Thread.fromNode(threadNode) as Thread;

      if (thread) {
        boardThreads.push(thread);
      }
    })

     return new Board(id, boardName, boardThreads, node);
  }
}
