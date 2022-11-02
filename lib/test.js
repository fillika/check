import State from "./State.js";
import TestObject from "./TestObject.js";

let testCounter = 0;

/**
 * @param {string} name
 * @param cb
 * @return {*}
 */
function test(name, cb) {
    const ID = "Test number is_" + testCounter,
        testObj = new TestObject(ID, name, cb);

    State.add(ID, testObj);

    testCounter++;
}

export default test;