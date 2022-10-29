function createTestName(name) {
    const span = document.createElement("span");
    span.innerText = name;

    return span;
}

export default createTestName;