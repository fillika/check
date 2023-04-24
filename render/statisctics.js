function createStatisticBillboard(success, fail, total) {
    const wrapper = document.createElement(`div`);
    const totalDiv = document.createElement("div");
    const successDiv = document.createElement("div");
    const failDiv = document.createElement("div");

    wrapper.classList.add("statistic-billboard");
    totalDiv.classList.add("total");
    successDiv.classList.add("success");
    fail > 0 && failDiv.classList.add("fail");

    wrapper.insertAdjacentElement("afterbegin", failDiv)
    wrapper.insertAdjacentElement("afterbegin", successDiv)
    wrapper.insertAdjacentElement("afterbegin", totalDiv)

    totalDiv.innerText = `Total: ${total}`;
    successDiv.innerText = `Success: ${success}`;
    failDiv.innerText = `Fail: ${fail}`;

    return wrapper;
}

export default createStatisticBillboard;