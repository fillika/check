import State from "./State.js";
import Observer from "./Observer.js";

class StateManager extends Observer{
    constructor(state) {
        super();
        this._state = state;
    }

    /**
     * @param id
     */
    getTestByID(id) {
        return this._state.tests.get(id);
    }

    /**
     * @return {Map<string, string[]>}
     */
    getTestsGroup() {
        // Сформировать тесты, сортированные по группам?
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

        result.set("No-group", withoutGroup);
        return result;
    }

    setTestToTheGroup(groupName, testID) {
        if (!this._state.groups.has(groupName)) {
            this._state.groups.set(groupName, []);
        }

        const arrayWithTestIDs = this._state.groups.get(groupName);
        this._state.groups.set(groupName, arrayWithTestIDs.concat(testID));
    }

    /**
     * @return {{tests: {fail: number, total: number, success: number}}}
     */
    getReport() {
        return this._state.report;
    }

    /**
     * @param {string[]} arrayWithTestIDs
     * @return {Promise<TestObject>[]}
     */
    runTests(arrayWithTestIDs = []) {
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