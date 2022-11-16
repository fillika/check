import createResultGroup from "./createResultGroup.js";
import insertResultToDOM from "./insertResultToDOM.js";
import renderTestResult from "./renderTestResult.js";

function renderResults(results) {
    for (const { value } of results) {
        const groupName = value.groupName === null ? "no-group" : value.groupName;
        let target = document.querySelector(`div[data-id="${groupName}"]`);

        if (target === null) {
            insertResultToDOM(root, createResultGroup(groupName));
            target = document.querySelector(`div[data-id="${groupName}"]`);
        }

        target.insertAdjacentElement("beforeend", renderTestResult(value))
    }
}

export default renderResults;