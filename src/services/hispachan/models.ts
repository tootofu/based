import { ReplyBase, ThreadBase, BoardBase } from '../../lib/models'

class Reply extends ReplyBase {
  constructor(id: string, fileUrl: string, node: HTMLElement) {
    super(id, fileUrl, node);
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
         return new Reply(replyId, replyFileUrl, node);
      }
    }
    return null;
  }
}

export class Thread extends ThreadBase {
  constructor(id: string, board: string, fileUrl: string, content: Reply[], node: HTMLElement) {
    super(id, board, fileUrl, content, node);
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

    // getting thread replies
    const replyNodes: HTMLElement[] = [...node.querySelectorAll('.reply')] as HTMLElement[];
    const threadReplies: Reply[] = [];

    replyNodes.forEach((replyNode: HTMLElement) => {
      const reply: Reply | null = Reply.fromNode(replyNode) as Reply;

      if (reply) {
        threadReplies.push(reply);
      }
    })

    return new Thread(threadId, boardName, threadFileUrl, threadReplies, node);
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
