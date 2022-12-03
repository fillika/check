const { StateManager, renderAPI } = window;

const root = document.getElementById("root");
const report = document.getElementById("report");
const testUI = document.getElementById("test-ui");
const startButton = document.getElementById("start-button");
const testsGroup = StateManager.getTestsGroup();

// render checkboxes
let checkboxesMarkup = "";

// render test blocks
for (const [name, arrWithIDs] of testsGroup) {
    const arrWithTestConfig = arrWithIDs.map(id => ({
        id,
        name: StateManager.getTestByID(id).name,
    }))

    checkboxesMarkup += renderAPI.renderTestBlock(name, arrWithTestConfig)
}

testUI.innerHTML = checkboxesMarkup;

// make default height for every block
const blocks = document.querySelectorAll(".test-block");

blocks.forEach(block => block.style.height = 41 + "px");

// add listeners for test block
const toggles = document.querySelectorAll(".test-block__toggle");

toggles.forEach(title => title.addEventListener("click", event => {
    const PARENT = event.currentTarget.parentElement,
        title = PARENT.querySelector(".test-block__title"),
        TITLE_HEIGHT =title.getBoundingClientRect().height,
        CONTENT = PARENT.querySelector(".test-block__content"),
        contentHeight = CONTENT.getBoundingClientRect().height,
        parentHeight = PARENT.getBoundingClientRect().height;

    if (parentHeight === TITLE_HEIGHT) {
        PARENT.style.height = contentHeight + TITLE_HEIGHT + 'px';
    } else {
        PARENT.style.height = TITLE_HEIGHT + 'px';
    }
}))

const groupCheckboxes = document.querySelectorAll(".checkbox-group")

for (const groupCheckbox of groupCheckboxes) {
    groupCheckbox.addEventListener("change", event => {
        const parent = event.currentTarget.closest(".test-block"),
            innerCheckboxes = parent.querySelectorAll(".test-checkbox");

        innerCheckboxes.forEach(checkbox => checkbox.checked = event.currentTarget.checked)
    })
}

const allCheckboxes = document.querySelectorAll(".test-checkbox");

// listeners
startButton.addEventListener("click", () => {
    console.clear();
    root.innerHTML = "";
    report.innerHTML = "";
    startButton.setAttribute("disabled", "true");
    const { StateManager } = window;

    const testIDs = [];

    allCheckboxes.forEach(ch => {
        if (ch.checked) testIDs.push(ch.id);
    })

    const promises = StateManager.runTests(testIDs);

    Promise.allSettled(promises).then(results => {
        renderAPI.renderResults(results, root);

        const { tests: { success, total, fail } } = StateManager.getReport();
        report.insertAdjacentElement("beforeend", renderAPI.createStatisticBillboard(success, fail, total))
        startButton.removeAttribute("disabled");
    })
})