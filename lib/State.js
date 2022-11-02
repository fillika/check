class State {
    constructor() {
        this._report = {
            tests: {
                total: 0,
                success: 0,
                fail: 0,
            },
        };
        this._isDone = false;
        this._tests = new Map;
        this._groups = new Map;
    }

    get tests() {
        return this._tests;
    }

    get report() {
        return this._report;
    }

    get isDone() {
        return this._isDone;
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

    /**
     * @param {string} groupName
     * @param {string[]} arrayWithTestIDs
     */
    addGroup(groupName, arrayWithTestIDs) {
        if (!this._groups.has(groupName)) {
            this._groups.set(groupName, []);
        }

        const tests = this._groups.get(groupName);
        this._groups.set(groupName, tests.concat(arrayWithTestIDs));
    }
}

export default new State;