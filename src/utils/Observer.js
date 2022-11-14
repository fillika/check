class Observer {
    constructor() {
        this._observers = new Map;
    }

    /**
     * @param {string} eventName
     * @param cb
     */
    on(eventName, cb) {
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
     * @param eventName
     */
    off(eventName) {
        this._observers.delete(eventName);
    }

    /**
     * @param {string} eventName
     * @param args
     */
    trigger(eventName, ...args) {
        const callbacks = this._observers.get(eventName);

        if (callbacks) {
            for (const callback of callbacks) {
                callback(...args);
            }
        }
    }
}

export default Observer;