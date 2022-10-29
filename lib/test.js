import State from "./state.js";
import TestObject from "./TestObject.js";

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
    const ID = "Test number is_" + State.information.tests.total;

    State.information.tests.total++;
    State.tests.push(new TestObject(ID, name, cb))
}

export default test;