// Interfaces for a simple observer pattern implementation

export interface Observable {
  attach(o: Observer): void;
  notify(o: Observer, type: string , content: string): void;
}

export interface Observer {
  update(type: string , content: string): void;
}
