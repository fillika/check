import createCheckboxes from "./createCheckboxes";

/**
 * @param {string} title
 * @param {{id: string, name: string}[]}arrWithTests
 */
function renderTestBlock(title, arrWithTests) {
    return `
<div class="test-block">
    <div class="test-block__toggle"></div>
    <div class="test-block__title">
        <input class="checkbox-group" type="checkbox" id="${title}">
        <label for="${title}">${title}</label>
    </div>
    <div class="test-block__content">
        <div class="test-block__content-inner-wrapper">
            ${createCheckboxes(arrWithTests)}
        </div>
    </div>      
</div>
    `
}

export default renderTestBlock;