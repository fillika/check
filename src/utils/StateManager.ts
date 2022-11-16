import State from "./State";
import Observer from "./Observer";

class StateManager extends Observer implements IStateManager {
    _state: IState;

    constructor(state: IState) {
        super();
        this._state = state;
    }

    getTestByID(id: string) {
        return this._state.tests.get(id);
    }

    getTestsGroup() {
        const tests = new Map(this._state.tests),
            groups = new Map(this._state.groups),
            result = new Map;

        /**
         * First of all, we copy group in result and delete all
         * duplicate ID from test. When we finished we will have
         * all only tests without group
         */
        for (const [name, arrOfTest] of groups) {
            arrOfTest.forEach(id => tests.delete(id));
            result.set(name, arrOfTest);
        }

        const withoutGroup = [];
        for (const [key, _] of tests) {
            withoutGroup.push(key);
        }

        result.set("no-group", withoutGroup);
        return result;
    }

    setTestToTheGroup(groupName: string, testID: string) {
        if (!this._state.groups.has(groupName)) {
            this._state.groups.set(groupName, []);
        }

        const arrayWithTestIDs = this._state.groups.get(groupName);
        this._state.groups.set(groupName, arrayWithTestIDs.concat(testID));
    }

    getReport() {
        return this._state.report;
    }

    runTests(arrayWithTestIDs: string[] = []) {
        this._state.resetReport();
        let tests = [];

        if (!Array.isArray(arrayWithTestIDs))
            throw new Error("Incorrect argument. Must be array of string");

        if (arrayWithTestIDs.length === 0) {
            tests = Array.from(this._state.tests.values());
        } else {
            /**
             * If we have selected tests
             */
            for (const testID of arrayWithTestIDs) {
                if (this._state.tests.has(testID)) {
                    tests.push(this._state.tests.get(testID));
                }
            }
        }

        return tests.map(testObj => testObj.run());
    }

    addTest(name: string, test: ITestObject) {
        this._state.add(name, test);
    }

    addToReportSuccess() {
        this._state.addToReport.success();
    }

    addToReportTotal() {
        this._state.addToReport.total();
    }

    addToReportFail() {
        this._state.addToReport.fail();
    }
}

export default new StateManager(State);