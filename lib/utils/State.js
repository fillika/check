class State {
    constructor() {
        this._report = {
            tests: {
                total: 0,
                success: 0,
                fail: 0,
            },
        };
        /**
         * @type {Map<string, TestObject>}
         * @private
         */
        this._tests = new Map;
        this._groups = new Map;
    }

    get groups() {
        return this._groups;
    }

    /**
     * @return {Map<string, TestObject>}
     */
    get tests() {
        return this._tests;
    }

    get report() {
        return this._report;
    }

    get addToReport() {
        return {
            total: () => this._report.tests.total++,
            success: () => this._report.tests.success++,
            fail: () => this._report.tests.fail++,
        }
    }

    resetReport() {
        this._report.tests = {
            total: 0,
            success: 0,
            fail: 0,
        };
    }

    add(name, test) {
        this._tests.set(name, test);
    }
}

export default new State;