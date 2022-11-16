import TestObject from "./TestObject"

class State implements IState {
    _report: Report
    _tests: Map<string, TestObject>
    _groups: Map<string, string[]>

    constructor() {
        this._report = {
            tests: {
                total: 0,
                success: 0,
                fail: 0,
            },
        };

        this._tests = new Map;
        this._groups = new Map;
    }

    get groups() {
        return this._groups;
    }

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

    add(name: string, test: TestObject) {
        this._tests.set(name, test);
    }
}

export default new State;