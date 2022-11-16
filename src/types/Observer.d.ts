interface IObserver {
    on(eventName: string, cb: (...args: any[]) => void): void;

    off(eventName: string): void;

    trigger(eventName: string, ...args: any[]): void;
}