import Test from "./Test.js";

class Comparator {
    constructor(param) {
        this.param = param;
    }

    get not() {
        const self = this;

        return {
            toBe(arg) {
                Test.push(self.param !== arg);
            },
            toEqual(arg) {
                Test.push(!self.deepEqual(self.param, arg));
            },
            toBeNull() {
                Test.push(self.param !== null);
            },
            toBeFalsy() {
                Test.push(self.param !== false);
            },
            toBeTruthy() {
                Test.push(self.param !== true);
            },
            toBeUndefined() {
                Test.push(self.param !== undefined);
            },
        }
    }

    deepEqual(objA, objB, map = new WeakMap()) {
        /**
         * Get it from here
         * https://levelup.gitconnected.com/how-to-get-a-perfect-deep-equal-in-javascript-b849fe30e54f
         */
        // P1
        if (Object.is(objA, objB)) return true;

        // P2
        if (objA instanceof Date && objB instanceof Date) {
            return objA.getTime() === objB.getTime();
        }

        if (objA instanceof RegExp && objB instanceof RegExp) {
            return objA.toString() === objB.toString();
        }

        if (Array.isArray(objA) && Array.isArray(objB)) {
            if (objA.length !== objB.length) return false;

            for (let i = 0, ln = objA.length; i < ln; i++) {
                if (!this.deepEqual(objA[i], objB[i], map)) {
                    return false;
                }
            }

            return true;
        }

        // P3
        if (
            typeof objA !== 'object' ||
            objA === null ||
            typeof objB !== 'object' ||
            objB === null
        ) {
            return false;
        }

        // P4
        if (map.get(objA) === objB) return true;
        map.set(objA, objB);

        // P5
        const keysA = Reflect.ownKeys(objA);
        const keysB = Reflect.ownKeys(objB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        for (let i = 0; i < keysA.length; i++) {
            if (
                !Reflect.has(objB, keysA[i]) ||
                !this.deepEqual(objA[keysA[i]], objB[keysA[i]], map)
            ) {
                return false;
            }
        }

        return true;
    };

    toBe(arg) {
        Test.push(this.param === arg);
    }

    // deep equal
    toEqual(arg) {
        Test.push(this.deepEqual(this.param, arg));
    }

    toBeNull() {
        Test.push(this.param === null);
    }

    toBeFalsy() {
        Test.push(this.param === false);
    }

    toBeTruthy() {
        Test.push(this.param === true);
    }

    toBeUndefined() {
        Test.push(this.param === undefined);
    }
}

export default Comparator;