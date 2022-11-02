import State from "./State.js";
import TestError from "./TestError.js";

class TestObject {
    constructor(id, name, callback) {
        this.id = id;
        this.callback = callback;
        this.name = name;
        this.result = false;
    }

    run() {
        State.addToReport.total();

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
                State.addToReport.success();
            })
            .catch((err) => {
                console.error(`Test: "${this.name}"`, err);
                State.addToReport.fail();
            })
            .then(() => {
                return this;
            })
    }
}

export default TestObject;