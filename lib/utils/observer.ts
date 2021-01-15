export interface Notification {
  type: string;
  payload: string;
  target?: any;
}

export interface Observable {
  attach(o: Observer): void;
  notify(n: Notification): void;
}

export interface Observer {
  update(n: Notification): void;
}
