// Interfaces for a simple observer pattern implementation

export interface Observable {
  notify(): void;
}

export interface Observer {
  update(): void;
}
