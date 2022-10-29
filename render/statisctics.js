function createStatisticBillboard(success, fail, total) {
    const wrapper = document.createElement("div"),
        totalDiv = document.createElement("div"),
        successDiv = document.createElement("div"),
        failDiv = document.createElement("div");

    wrapper.insertAdjacentElement("afterbegin", failDiv)
    wrapper.insertAdjacentElement("afterbegin", successDiv)
    wrapper.insertAdjacentElement("afterbegin", totalDiv)

    totalDiv.innerText = `Total: ${total}`;
    successDiv.innerText = `Success: ${success}`;
    failDiv.innerText = `Fail: ${fail}`;

    wrapper.style.cssText = "background-color: #d7d7f7; padding: 8px;";

    return wrapper;
}

export default createStatisticBillboard;