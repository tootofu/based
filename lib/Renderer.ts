import { DownloadButton, ZipButton } from './ui/buttons';
import { Post } from './components';
import View from './View';

export default class {
  static render(post: Post): View {
    const downloadButtons: DownloadButton[] = [];

    const downloadButton = new DownloadButton(post.id);
    post.renderPlace?.appendChild(downloadButton.element);
    downloadButtons.push(downloadButton);

    const zipButton = new ZipButton('zip');
    post.renderPlace?.appendChild(zipButton.element);

    post.content.forEach((reply) => {
      const button = new DownloadButton(reply.id);
      reply.renderPlace?.appendChild(button.element);
      downloadButtons.push(button);
    })

    return new View(zipButton, downloadButtons);
  }
}
