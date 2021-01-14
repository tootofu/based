import Downloader from './Downloader';
import { Observable, Observer, Notification } from './utils/observer';
import { Post } from './components';
import Saver from './Saver';
import Zipper from './Zipper';

type State = {
  [key: string]: string[]
}

export default class implements Observable {

  private stateId: string;
  private post: Post;
  private downloader = new Downloader();
  private saver = new Saver();
  private zipper = new Zipper();

  private observer: Observer; // initialized when an Observer is attached

  constructor(post: Post) {
    this.stateId = post.id;
    this.post = post;

    this.checkInitialState();
  }

  public attach(o: Observer): void {
    this.observer = o;
  }

  public notify(n: Notification): void {
    if (this.observer) this.observer.update(n);
    else throw new Error('Model.notify error: there is not Observer to notify');
  }

  private checkInitialState(): void {
    if (!localStorage['based'] || !localStorage['based'][this.stateId]) {
      const initialState: State = {};
      initialState[this.stateId] = [];
      
      localStorage.setItem('based', JSON.stringify(initialState));
    }
  }

  private getGlobalState(): State {
    return JSON.parse(localStorage.getItem('based')!); 
  }

  private getPostState(): string[] {
    return JSON.parse(localStorage['based'][this.stateId]);
  }

  private setPostState(state: string[]): void {
    const postState: string[] = this.getPostState();
    const globalState: State = this.getGlobalState();

    globalState[this.stateId] = postState.concat(state);
  }

  private getPostFileUrlById(id: string): string {
    return this.post.id == id ? this.post.fileUrl as string : this.post.content.find((reply) => reply.id == id)?.fileUrl as string;
  }

  private getPostFilesUrl(): string[] {
    const urls: string[] = [];

    urls.push(this.post.fileUrl!);
    this.post.content.forEach(reply => urls.push(reply.fileUrl!));

    return urls
  }

  public async downloadAndSave(id: string): Promise<void> {
    const fileUrl = this.getPostFileUrlById(id);
    const fileName = fileUrl.match(/[0-9]+\.[a-z0-9]+$/g)![0];
    
    let error;
    this.notify({type: 'download', target: id, payload: 'Downloading...'});

    await this.downloader.download(fileUrl)
            .then(blob => {
              this.notify({type: 'save', target: id, payload: 'Saving...'});
              this.saver.saveFile(blob, fileName);
            })
            .catch(err => {
              error = err;
              this.notify({type: 'error', target: id, payload: err});
              console.error(`Model.downloadAndSave() error: ${err}`);
            });

    if (!error) this.notify({type: 'success', target: id, payload: 'Success!'});
  }

  public async downloadAndZip(id: string, all: boolean = false): Promise<void> {
    let downloaded: {fileName: string, blob: Blob}[] = [];
    let downloadedIds: string[] = [];

    let error;
    this.notify({type: 'progress', target: id, payload: `${downloaded.length}/${this.getPostFilesUrl().length}`});

    for (let fileUrl of this.getPostFilesUrl()) {
      const fileId = fileUrl.match(/[0-9]+/g)![0];
      const fileName = fileUrl.match(/[0-9]+\.[a-z0-9]+$/g)![0];

      await this.downloader.download(fileUrl)
              .then(blob => {
                downloaded.push({fileName: fileName, blob: blob});
                downloadedIds.push(fileId);
                this.notify({type: 'progress', target: id, payload: `${downloaded.length}/${this.getPostFilesUrl().length}`});
              })
              .catch((err) => {
                error = err;
                this.notify({type: 'error', target: id, payload: err});
                console.error(`Model.downloadAndZip() error: ${err}`);
              });

      if (error) {
        break;
      }
    }

    if (!error) {
      this.notify({type: 'zip', target: id, payload: 'Generating zip file...'});

      await this.zipper.generateZipFile(downloaded)
              .then(zipFile => {
                this.notify({type: 'save', target: id, payload: 'Saving...'});
                
                this.saver.saveFile(zipFile, `${this.post.id}.zip`);
                this.notify({type: 'success', target: id, payload: 'Success!'});
              })
              .catch((err) => {
                error = err;
                this.notify({type: 'error', target: id, payload: err});
                console.error(`Model.downloadAndZip() error: ${err}`);
              });
    }
  }
}
