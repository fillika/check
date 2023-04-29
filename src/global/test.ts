import StateManager from "../utils/StateManager";
import TestObject from "../utils/TestObject";

let testCounter = 0;

function test(name: string, cb: () => void): void {
    const ID = "Test number is_" + testCounter;
    const testObj = new TestObject(ID, name, cb);

    StateManager.addTest(ID, testObj);

    testCounter++;
}

export default test;