import Downloader from './Downloader';
import { Observable, Observer, Notification } from './utils/observer';
import { Post } from './components';
import Saver from './Saver';
import State from './State';
import Zipper from './Zipper';

interface FileData {
  id: string;
  name: string;
  url: string;
  alreadyDownloaded: boolean;
  blob?: Blob;
}

export default class implements Observable {

  private downloader = new Downloader();
  private saver = new Saver();
  private zipper = new Zipper();
  
  private observer: Observer; // initialized when an Observer is attached
  private post: Post;
  private state: State;

  constructor(post: Post) {
    this.post = post;
    this.state = new State(post.id);
  }

  public attach(o: Observer): void {
    this.observer = o;
    this.notify({type: 'state', payload: ((this.post.content.length + 1) - this.state.pull().length).toString()});
  }

  public notify(n: Notification): void {
    if (this.observer) this.observer.update(n);
    else throw new Error('Model.notify() error: there is not Observer to notify');
  }

  private getFileDataById(id: string): FileData {
    if (this.post.id == id) {
      return {
        id: this.post.id,
        name: this.post.fileUrl!.match(/[0-9]+\.[a-z0-9]+$/g)![0],
        url: this.post.fileUrl!,
        alreadyDownloaded: (this.state.isStored(this.post.id))
      }
    } else {
      const reply = this.post.content.find(reply => reply.id == id);
      if (reply)
        return {
          id: reply.id,
          name: reply.fileUrl!.match(/[0-9]+\.[a-z0-9]+$/g)![0],
          url: reply.fileUrl!,
          alreadyDownloaded: (this.state.isStored(reply.id))
        }
      else
        throw new Error('Model.getFileDataById() error: this should not happend, report it please!');
    }
  }

  private getFileDataArray(): FileData[] {
    const fdArray: FileData[] = [];
    fdArray.push(this.getFileDataById(this.post.id));
    this.post.content.forEach(reply => fdArray.push(this.getFileDataById(reply.id)));

    return fdArray;
  }

  public async downloadAndSave(id: string): Promise<void> {
    const fileData = this.getFileDataById(id);
        
    let error;
    this.notify({type: 'download', target: id, payload: 'Downloading...'});

    await this.downloader.download(fileData.url)
            .then(blob => {
              this.notify({type: 'save', target: id, payload: 'Saving...'});
              this.saver.saveFile(blob, fileData.name);
            })
            .catch(err => {
              error = err;
              this.notify({type: 'error', target: id, payload: err});
            });

    if (!error) this.notify({type: 'success', target: id, payload: 'Success!'});
  }

  public async downloadAndZip(id: string, all: boolean=false): Promise<void> {
    let fdArray: FileData[] = this.getFileDataArray();

    if (!all) {
      fdArray = fdArray.filter(fileData => !fileData.alreadyDownloaded);
    }

    if (fdArray.length > 0) {
      let error;
      let counter = 1;
      this.notify({type: 'download', payload: 'Downloading...', target: id});
  
      for (let fileData of fdArray) {
        await this.downloader.download(fileData.url)
                .then(blob => {
                  counter++;
                  fileData.blob = blob;
                  this.state.add(fileData.id);
                  this.notify({type: 'progress', payload: `${counter}/${fdArray.length}`, target: id});
                })
                .catch((err) => {
                  error = err;
                  this.notify({type: 'error', payload: err, target: id});
                });
  
        if (error) {
          this.state.rollback();
          break;
        }
      }
  
      if (!error) {
        this.notify({type: 'zip', payload: 'Generating zip file...', target: id});
  
        const files: {fileName: string, blob: Blob}[] = fdArray.map(fileData => {
            return {fileName: fileData.name, blob: (fileData.blob as Blob)};
        })
  
        await this.zipper.generateZipFile(files)
                .then(zipFile => {
                  this.notify({type: 'save', target: id, payload: 'Saving...'});
                  this.saver.saveFile(zipFile, `${this.post.id}.zip`);
                })
                .then(() => {
                  this.state.commit();
                  this.notify({type: 'state', payload: ((this.post.content.length + 1) - this.state.pull().length).toString()});
                })
                .catch((err) => {
                  error = err;
                  this.state.rollback();
                  this.notify({type: 'error', target: id, payload: err});
                });
      }
    } else {
      this.notify({type: 'state', payload: ((this.post.content.length + 1) - this.state.pull().length).toString()});
    }
  }
}
