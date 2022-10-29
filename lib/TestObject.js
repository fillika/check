import State from "./state.js";

class TestObject {
    constructor(id, name, callback) {
        this.id = id;
        this.callback = callback;
        this.name = name;
        this.result = false;
    }

    run() {
        return new Promise((resolve, reject) => {
            try {
                const result = this.callback();

                if (result instanceof Promise) {
                    Promise.allSettled([result])
                        .then(results => {
                            results.forEach(res => {
                                switch (res.status) {
                                    case "rejected":
                                        reject(new Error(res.reason.stack))
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
                State.information.tests.success++;
            })
            .catch((err) => {
                console.error(`Test: "${this.name}"`, err);
                State.information.tests.fail++;
            })
            .then(() => {
                return this;
            })
    }
}

export default TestObject;