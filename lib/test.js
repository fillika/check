import State from "./State.js";
import TestObject from "./TestObject.js";

let testCounter = 0;

/**
 * note
 *  Есть ли смысл сделать функцию, которая будет отвечать за запуск всех тестов?
 *  Т.е. сначала мы собираем каждый тест как отдельный объект с данными и промисом,
 *  потом у нас есть возможность выбрать определенные тесты и запустить их?
 */

/**
 * @param {string} name
 * @param cb
 * @return {*}
 */
function test(name, cb) {
    const ID = "Test number is_" + testCounter,
        testObj = new TestObject(ID, name, cb);

    // State.tests.push(testObj);
    State.add(ID, testObj);

    testCounter++;
}

export default test;