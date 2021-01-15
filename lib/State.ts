type State = {
  [key: string]: string[];
}

export default class {

  private staying: string[] = [];
  
  private id: string;

  constructor(id: string) {
    this.id = id;

    this.checkState();
  }

  private checkState() {
    if (!localStorage.getItem('based') || !JSON.parse(localStorage.getItem('based')!)[this.id]) {
      const initialState: State = {};
      initialState[this.id] = [];
      localStorage.setItem('based', JSON.stringify(initialState));
    }
  }

  public pull(): string[] {
    this.checkState();
    return JSON.parse(localStorage.getItem('based')!)[this.id];
  }

  public add(id: string): void {
    this.staying.push(id);
    this.checkState();
  }

  public commit(): void {
    this.checkState();
    const newState: State = {};
    const prevState: string[] = this.pull();
    
    newState[this.id] = prevState.concat(this.staying.filter(id => prevState.indexOf(id) == -1));
    this.staying = [];
    localStorage.setItem('based', JSON.stringify(newState));
  }

  public rollback(): void {
    this.staying = [];
  }

  public delete(): void {
    localStorage.setItem('based', JSON.stringify({}));
  }

  public isStored(id: string): boolean {
    this.checkState();
    if (this.pull().indexOf(id) == -1) return false;
    else return true;
  }
}
