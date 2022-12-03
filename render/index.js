import renderTestResult from "./renderTestResult.js";
import createStatisticBillboard from "./statisctics.js";
import insertResultToDOM from "./insertResultToDOM.js";
import createResultGroup from "./createResultGroup.js";
import renderResults from "./renderResults.js";
import renderTestBlock from "./renderTestBlock.js";

window.renderAPI = {
    insertResultToDOM,
    renderTestResult,
    createStatisticBillboard,
    createResultGroup,
    renderResults,
    renderTestBlock,
}

export {
    insertResultToDOM,
    renderTestResult,
    createStatisticBillboard,
    createResultGroup,
    renderResults,
    renderTestBlock
}