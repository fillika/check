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
                this.callback();
            } catch (e) {
                reject(e)
            } finally {
                resolve(name);
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