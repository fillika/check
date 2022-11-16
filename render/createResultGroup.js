function createResultGroup(groupName) {
    const wrapper = document.createElement("div"),
        title = document.createElement("div");

    title.innerHTML = groupName;
    wrapper.dataset.id = groupName;

    wrapper.classList.add("group-result");
    title.classList.add("group-result__title");

    wrapper.insertAdjacentElement("afterbegin", title)
    return wrapper;
}

export default createResultGroup;