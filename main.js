import { renderTestResult, insertResultToDOM, createStatisticBillboard } from "./render";

const root = document.getElementById("root");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
    root.innerHTML = "";
    startButton.setAttribute("disabled", "true");

    const promises = window.checkLib.state.tests.map(p => p.run());

    for (const promise of promises) {
        promise.then(test => insertResultToDOM(root, renderTestResult(test)))
    }

    Promise.allSettled(promises).then(results => {
        const { success, total, fail } = window.checkLib.state.information.tests
        root.insertAdjacentElement("afterbegin", createStatisticBillboard(success, fail, total))
        startButton.removeAttribute("disabled");
    })
})