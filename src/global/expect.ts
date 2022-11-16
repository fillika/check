import Comparator from "../utils/Comparator";

function expect(arg: any) {
    return new Comparator(arg);
}

export default expect;