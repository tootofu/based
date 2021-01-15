import { Reply as AbsReply, Post as AbsPost } from '../../../lib/components';

class Reply extends AbsReply {

  constructor(node: HTMLElement) {
    super(node);
  }

  protected getId(node: HTMLElement): string {
    return node.id.match(/\d+$/g)![0];
  }

  protected getRenderPlace(node: HTMLElement): HTMLElement | null {
    return node.querySelector('.fileText');
  }
  
  protected getFileUrl(id: string, node: HTMLElement): string | null {
    // Sometimes, when an answer has a link and does not have a file,
    // the link is taken as the URL of the image, that is wrong!
    // renderPlace setter checks if exist a file in the reply
    // because the CSS class 'filesize' is only in replies with files.
    // so, if renderPlace is null, there is not a file.
    if (this.renderPlace != null) {
      const reference: HTMLElement | null = node.querySelector('.fileText');
      
      if (reference != null) {
        const fileContainer: HTMLAnchorElement | null = reference.querySelector('a');
  
        if (fileContainer && fileContainer.target) {
          return fileContainer.href;
        }
      }
    }
    return null;
  }
}

export class Post extends AbsPost {

  constructor(node: HTMLElement) {
    super(node);
  }

  protected getId(node: HTMLElement): string {
    return node.id.match(/\d+/g)![0];
  }

  protected getRenderPlace(node: HTMLElement): HTMLElement | null {
    return node.querySelector('.fileText');
  }

  protected getFileUrl(id: string, node: HTMLElement): string | null {
    const reference: HTMLElement | null = node.querySelector('.fileText');
    
    if (reference != null) {
      const urlContainer: Element | null = reference.firstElementChild;

      if (urlContainer != null) {
        return (urlContainer as HTMLAnchorElement).href;
      }
    }
    return null;
  }

  protected getContent(node: HTMLElement): Reply[] {
    const replyNodes: HTMLElement[] = [...node.querySelectorAll('.postContainer.replyContainer')] as HTMLElement[];
    const threadReplies: Reply[] = [];

    for (const replyNode of replyNodes) {

      if (replyNode) {
        const reply: Reply = new Reply(replyNode)
        // we only will take the ones that have files
        if (reply.fileUrl) {
          threadReplies.push(reply);
        }
      }
    }
    return threadReplies;
  }
}
