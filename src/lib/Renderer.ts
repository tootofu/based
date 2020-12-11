import FileData from '../utils/FileData';

import { ReplyBase, ThreadBase } from './components';
import { SingleButton, ZIPButton } from './ui';

export default class Renderer {
  public static renderOnGeneric(generic: ReplyBase | ThreadBase): void {
    const singleButton = new SingleButton('Download file', generic.fileData);
    generic.renderPlace.appendChild(singleButton.element);
  }

  public static renderOnThread(thread: ThreadBase): void {
    Renderer.renderOnGeneric(thread);

    const threadFileData: FileData[] = [];
    threadFileData.push(thread.fileData);

    for (const reply of thread.content) {
      // rendering on reply
      Renderer.renderOnGeneric(reply);
      // adding reply file data to 'threadFileData' array
      threadFileData.push(reply.fileData);
    }

    const zipButton = new ZIPButton('Download as ZIP', threadFileData);
    thread.renderPlace.appendChild(zipButton.element);
  }
}
