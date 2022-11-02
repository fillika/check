import { renderTestResult, insertResultToDOM, createStatisticBillboard } from "./render";

const root = document.getElementById("root");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
    root.innerHTML = "";
    startButton.setAttribute("disabled", "true");
    const { StateManager } = window.checkLib;

    const promises = StateManager.runTests();

    for (const promise of promises) {
        promise.then(test => insertResultToDOM(root, renderTestResult(test)))
    }

    Promise.allSettled(promises).then(results => {
        const { tests: { success, total, fail } } = StateManager.getReport();
        root.insertAdjacentElement("afterbegin", createStatisticBillboard(success, fail, total))
        startButton.removeAttribute("disabled");
    })
})