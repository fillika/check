import {
    createFieldSet,
    createStatisticBillboard,
    renderResults,
} from "./render";

const { StateManager } = window;

const root = document.getElementById("root");
const testUI = document.getElementById("test-ui");
const startButton = document.getElementById("start-button");
const testsGroup = StateManager.getTestsGroup();

// render checkboxes
let checkboxesMarkup = "";

for (const [name, arrWithIDs] of testsGroup) {
    const arrWithTestConfig = arrWithIDs.map(id => ({
        id,
        name: StateManager.getTestByID(id).name,
    }))

    checkboxesMarkup += createFieldSet(name, arrWithTestConfig)
}

testUI.innerHTML = checkboxesMarkup;

const groupCheckboxes = document.querySelectorAll(".checkbox-group")

for (const groupCheckbox of groupCheckboxes) {
    groupCheckbox.addEventListener("change", event => {
        const parent = event.currentTarget.closest("fieldset"),
            innerCheckboxes = parent.querySelectorAll(".test-checkbox");

        innerCheckboxes.forEach(checkbox => checkbox.checked = event.currentTarget.checked)
    })
}

const allCheckboxes = document.querySelectorAll(".test-checkbox");

// listeners
startButton.addEventListener("click", () => {
    console.clear();
    root.innerHTML = "";
    startButton.setAttribute("disabled", "true");
    const { StateManager } = window;

    const testIDs = [];

    allCheckboxes.forEach(ch => {
        if (ch.checked) testIDs.push(ch.id);
    })

    const promises = StateManager.runTests(testIDs);

    Promise.allSettled(promises).then(results => {
        renderResults(results);

        const { tests: { success, total, fail } } = StateManager.getReport();
        root.insertAdjacentElement("afterbegin", createStatisticBillboard(success, fail, total))
        startButton.removeAttribute("disabled");
    })
})