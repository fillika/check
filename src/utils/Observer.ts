type callback = (...args: any[]) => void;

class Observer implements IObserver {
    _observers: Map<string, callback[]>;

    constructor() {
        this._observers = new Map;
    }

    on(eventName: string, cb: callback) {
        if (!this._observers.has(eventName)) {
            this._observers.set(eventName, [cb]);
            return;
        }

        const cbArr = this._observers.get(eventName);
        this._observers.set(eventName, cbArr.concat(cb));
    }

    /**
     * todo Пока что сделал удаление всего по ключу, сделать
     *  потом filter для callbacks
     */
    off(eventName: string) {
        this._observers.delete(eventName);
    }

    trigger(eventName: string, ...args: any[]) {
        const callbacks = this._observers.get(eventName);

        if (callbacks) {
            for (const callback of callbacks) {
                callback(...args);
            }
        }
    }
}

export default Observer;