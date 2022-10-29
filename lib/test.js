import Test from "./Test.js";

/**
 * @param {string} name
 * @param cb
 * @return {*}
 */
function test(name, cb) {
    try {
        cb(name);
    } catch (e) {
        Test.push(false);
        console.error(`Error inside test "${name}"`, e);
    }

    const test = new Test(name);
    test.printResult();

    // Clear
    Test.tests.length = 0;
}

export default test;