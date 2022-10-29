import { renderTestResult, insertResultToDOM } from "./render";

const root = document.getElementById("root");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
    root.innerHTML = "";

    const promises = window.checkLib.state.tests.map(p => p.run());

    Promise.allSettled(promises).then(results => results.forEach(result => {
        switch (result.status) {
            case "fulfilled":
                insertResultToDOM(root, renderTestResult(result.value))
                break;
            case "rejected":
                break;
        }
    }))
})