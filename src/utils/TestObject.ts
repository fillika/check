import StateManager from "./StateManager";
import TestError from "./TestError";

class TestObject implements ITestObject {
    _id: string;
    _name: string;
    _result: boolean;
    _callback: CallbackInTestObject;

    constructor(id: string, name: string, callback: CallbackInTestObject) {
        this._id = id;
        this._name = name;
        this._result = false;
        this._callback = callback;

        StateManager.trigger("addTest", this._id);
    }

    get result() {
        return this._result;
    }

    get name() {
        return this._name;
    }

    run() {
        const _self = this;

        StateManager.addToReportTotal();

        return new Promise<ITestObject>((resolve, reject) => {
            try {
                const result = this._callback();

                if (result instanceof Promise) {
                    Promise.allSettled([result])
                        .then(results => {
                            results.forEach(res => {
                                switch (res.status) {
                                    case "rejected":
                                        reject(new TestError(res.reason.message, { stack: res.reason.stack }))
                                        break;
                                    default:
                                        resolve(_self);
                                }
                            })
                        })
                        .catch(reject)
                } else {
                    resolve(_self)
                }
            } catch (e) {
                reject(e)
            }
        })
            .then(() => {
                this._result = true;
                StateManager.addToReportSuccess();
            })
            .catch(err => {
                console.error(`Test: "${this._name}"`, err);
                StateManager.addToReportFail();
            })
            .then(() => _self)
    }
}

export default TestObject;