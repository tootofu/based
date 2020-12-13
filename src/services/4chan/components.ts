import FileData from '../../utils/FileData';

import {  ReplyBase, ThreadBase } from '../../lib/components'

class Reply extends ReplyBase {
  constructor(id: string, fileData: FileData, node: HTMLElement, renderPlace: HTMLElement) {
    super(id, fileData, node, renderPlace);
  }

  public static fromNode(node: HTMLElement): Reply | null {
    // getting reply id
    const replyId: string = node.id.match(/\d+$/g)![0];
    // getting file URL
    const referenceElement: HTMLElement = node.querySelector('.file') as HTMLElement;
    
    if (replyId && referenceElement) {
      const fileElement: HTMLAnchorElement  = referenceElement!.querySelector('.fileThumb') as HTMLAnchorElement;
      
      if (fileElement && fileElement.target) {
        const replyFileUrl: string = fileElement.href;
        
        const replyFileData: FileData = {
          url: replyFileUrl,
          name: replyId,
          extension: replyFileUrl.match(/[a-z0-9]*$/g)![0]
        }

        const renderPlace: HTMLElement = node.querySelector('.postInfo') as HTMLElement;

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
    const boardName: string = ''; // this should be deprecated, totally usless!
    // getting thread URL
    const threadUrl: string = ''; // useless too...
    // getting thread file URL
    const referenceElement: HTMLElement = node.querySelector('.opContainer') as HTMLElement;
    const fileElement: HTMLAnchorElement = referenceElement!.querySelector('.fileThumb') as HTMLAnchorElement;
    const threadFileUrl: string = fileElement.href;

    const threadFileData: FileData = {
      url: threadFileUrl,
      name: threadId,
      extension: threadFileUrl.match(/[a-z0-9]*$/g)![0]
    }

    // getting thread replies
    const replyNodes: HTMLElement[] = [...node.querySelectorAll('.replyContainer')] as HTMLElement[];
    const threadReplies: Reply[] = [];

    replyNodes.forEach((replyNode: HTMLElement) => {
      const reply: Reply | null = Reply.fromNode(replyNode) as Reply;

      if (reply) {
        threadReplies.push(reply);
      }
    })

    const renderPlace: HTMLElement = node.querySelector('.postInfo') as HTMLElement;

    return new Thread(threadId, boardName, threadFileData, threadReplies, node, renderPlace);
  }
}