export default class {

  private allowed: RegExp[] = [
    /https:\/\/([a-z]*\.)?(4chan|4channel)\.org/i,
    /https:\/\/www.(hispachan|hispasexy).org/i,
  ]

  private corsProxy: string = 'https://cors-anywhere.herokuapp.com/';
  
  constructor() {}

  private async corsRequiered(url: string): Promise<boolean> {
    const result: boolean = this.allowed.some(regex => regex.test(url));
    return !result;
  }
  
  public async download(url: string): Promise<Blob> {
    const blob = await this.corsRequiered(url)
                         .then(result => result ? this.corsProxy + url : url)
                         .then(fetch)
                         .then(res => res.blob())
                         .catch(err => {throw err});

    return blob;
  }
}
