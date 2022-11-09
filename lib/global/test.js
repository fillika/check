import StateManager from "../utils/StateManager.js";
import TestObject from "../utils/TestObject.js";

let testCounter = 0;

/**
 * @param {string} name
 * @param cb
 * @return {*}
 */
function test(name, cb) {
    const ID = "Test number is_" + testCounter,
        testObj = new TestObject(ID, name, cb);

    StateManager.addTest(ID, testObj);

    testCounter++;
}

export default test;