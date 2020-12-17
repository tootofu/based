import FileData from '../../../lib/utils/FileData';

import {  ReplyBase, ThreadBase } from '../../../lib/components';

class Reply extends ReplyBase {

  constructor(node: HTMLElement) {
    super(node);
  }

  protected setId(node: HTMLElement): string {
    return node.id.match(/\d+$/g)![0];
  }

  protected setRenderPlace(node: HTMLElement): HTMLElement | null {
    return node.querySelector('.filesize');
  }
  
  protected setFileData(id: string, node:HTMLElement): FileData | null {
    // Sometimes, when an reply has a link and does not have a file,
    // the link is taken as the URL of the reply file, that is wrong!
    // renderPlace setter checks if exist a file in the reply
    // because the CSS class 'filesize' is only in replies with files.
    // so, if renderPlace is null, there is not a file.
    if (this.renderPlace != null) {
      const reference: HTMLElement | null = node.querySelector('.activa.activadis');
      
      if (reference != null) {
        const fileContainer: HTMLAnchorElement | null = reference.querySelector('a');
  
        if (fileContainer && fileContainer.target) {
          const fileURL: string = fileContainer.href;
          const fileExtension: string = fileURL.match(/[a-z0-9]*$/g)![0];
  
          const fileData: FileData = {
            url: fileURL,
            id: id,
            extension: fileExtension,
            fileName: `${id}.${fileExtension}`
          }
  
          return fileData;
        }
      }
    }

    return null;
  }
}

export class Thread extends ThreadBase {

  constructor(node: HTMLElement) {
    super(node);
  }

  protected setId(node: HTMLElement): string {
    return node.id.match(/\d+/g)![0];
  }

  protected setRenderPlace(node: HTMLElement): HTMLElement | null {
    return node.querySelector('.filesize');
  }

  protected setFileData(id: string, node: HTMLElement): FileData | null {
    const reference: HTMLElement | null = node.querySelector('.filesize');
    
    if (reference != null) {
      const urlContainer: Element | null = reference.firstElementChild;

      if (urlContainer != null) {
        const fileURL: string = (urlContainer as HTMLAnchorElement).href;
        const fileExtension: string = fileURL.match(/[a-z0-9]*$/g)![0];
        
        const fileData: FileData = {
          url: fileURL,
          id: id,
          extension: fileExtension,
          fileName: `${id}.${fileExtension}`
        }

        return fileData;
      }
    }
  
    return null;
  }

  protected setContent(node: HTMLElement): Reply[] {
    const replyNodes: HTMLElement[] = [...node.querySelectorAll('.respuesta.post')] as HTMLElement[];
    const threadReplies: Reply[] = [];

    for (const replyNode of replyNodes) {

      if (replyNode) {
        const reply: Reply = new Reply(replyNode)
        // we only will take the ones that have files
        if (reply.fileData) {
          threadReplies.push(reply);
        }
      }
    }
  
    return threadReplies;
  }
}
