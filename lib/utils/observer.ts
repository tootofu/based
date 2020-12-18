// Interfaces for a simple observer pattern implementation

export interface Notification {
  type: string;
  content: string;
}

export interface Observable {
  attach(o: Observer): void;
  notify(o: Observer, message: Notification): void;
}

export interface Observer {
  update(message: Notification): void;
}
