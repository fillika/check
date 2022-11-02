class StateManager {
    constructor(state) {
        this._state = state;
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
}

export default StateManager;