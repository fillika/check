import createCheckboxes from "./createCheckboxes.js";

/**
 * @param name
 * @param {{id: string, name: string}[]}arrWithTests
 */
function createFieldSet(name, arrWithTests) {
    return `
        <fieldset>
            <legend>
                <input class="checkbox-group" type="checkbox" id="${name}">
                <label for="${name}">${name}</label>
            </legend>
            <div>
                ${createCheckboxes(arrWithTests)}        
            </div>
        </fieldset>
`;
}

export default createFieldSet;