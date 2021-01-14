export interface Notification {
  type: string;
  target?: any;
  payload: string;
}

export interface Observable {
  attach(o: Observer): void;
  notify(n: Notification): void;
}

export interface Observer {
  update(n: Notification): void;
}
