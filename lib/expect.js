import Comparator from "./Comparator.js";

function expect(arg) {
    return new Comparator(arg);
}

export default expect;