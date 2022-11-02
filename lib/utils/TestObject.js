import StateManager from "./StateManager.js";
import TestError from "./TestError.js";

class TestObject {
    constructor(id, name, callback) {
        this.id = id;
        this.callback = callback;
        this._name = name;
        this.result = false;

        StateManager.trigger("addTest", this.id);
    }

    get name() {
        return this._name;
    }

    run() {
        StateManager.addToReportTotal();

        return new Promise((resolve, reject) => {
            try {
                const result = this.callback();

                if (result instanceof Promise) {
                    Promise.allSettled([result])
                        .then(results => {
                            results.forEach(res => {
                                switch (res.status) {
                                    case "rejected":
                                        reject(new TestError(res.reason.message, { stack: res.reason.stack }))
                                        break;
                                    default:
                                        resolve(name);
                                }
                            })
                        })
                        .catch((e) => reject(e))
                } else {
                    resolve(name)
                }
            } catch (e) {
                reject(e)
            }
        })
            .then(() => {
                this.result = true;
                StateManager.addToReportSuccess();
            })
            .catch((err) => {
                console.error(`Test: "${this._name}"`, err);
                StateManager.addToReportFail();
            })
            .then(() => {
                return this;
            })
    }
}

export default TestObject;