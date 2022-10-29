import createTestName from "./name.js";
import createSpanStatus from "./status.js";

/**
 * @param {TestObject} test
 */
function renderTestResult(test) {
    const div = document.createElement("div");

    div.insertAdjacentElement("beforeend", createSpanStatus(test.result))
    div.insertAdjacentElement("beforeend", createTestName(test.name))

    return div;
}

export default renderTestResult;