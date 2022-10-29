class State {
    constructor() {
        this._tests = [];
        this._information = {
            tests: {
                total: 0,
                success: 0,
                fail: 0,
            },
        };
        this._isDone = false;
    }

    get tests() {
        return this._tests;
    }

    get information() {
        return this._information;
    }

    get isDone() {
        return this._isDone;
    }

    reset() {
        this._information.tests = {
            total: 0,
            success: 0,
            fail: 0,
        };
    }
}

export default new State;