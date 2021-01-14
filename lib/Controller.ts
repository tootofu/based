import Model from './Model';
import View from './View';

export default class {

  private view: View;
  private model: Model;

  constructor(view: View, model: Model) {
    this.view = view;
    this.model = model;
    
    this.model.attach(view)
    this.setViewEventHandlers();
  }

  private setViewEventHandlers(): void {
    this.view.bindDownload(this.handleDownload.bind(this));
    this.view.bindZip(this.handleZip.bind(this));
  }

  public handleDownload(id: string): void {
    this.model.downloadAndSave(id);
  }

  public handleZip(id: string): void {
    this.model.downloadAndZip(id);
  }
}
