/**
 *
 * @param {{id: string, name: string}[]}arrWithTests
 * @return {string}
 */
function createCheckboxes(arrWithTests) {
    return `
    <div>
        ${arrWithTests.map(test => {
        return `<div style="padding-left: 25px">
                    <input 
                        type="checkbox" 
                        value="${test.name}" 
                        name="" 
                        id="${test.id}" 
                        class="test-checkbox" 
                    >
                    <label for="${test.id}">${test.name}</label>
                </div>
                `
    }).join("")}
    </div>`
}

export default createCheckboxes;