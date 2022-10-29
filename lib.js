const root = document.getElementById("root");

class Test {
    static tests = [];

    static push(arg) {
        Test.tests.push(arg)
    }

    constructor(/**string*/name) {
        this.name = name;
        this.success = [];
        this.failed = [];
        this.commonStyles = [
            "color: white",
            "padding: 0 3px",
            "font-weight: bold",
            "display: inline-block",
            "width: 55px",
            "text-alight: center",
            "margin-right: 3px",
        ];

        this.styles = {
            fail: ["background: red"].concat(this.commonStyles).join(";"),
            success: ["background: green"].concat(this.commonStyles).join(";"),
        }

        for (const testResult of Test.tests) {
            this.add(testResult)
        }
    }

    add(/**boolean*/result) {
        result
            ? this.success.push(result)
            : this.failed.push(result);
    }

    printResult() {
        const htmlFactory = this._htmlFactory(),
            result = htmlFactory.testResult(),
            spanStatus = htmlFactory.testStatus(this.failed.length),
            spanText = htmlFactory.testName();

        result.appendChild(spanStatus);
        result.appendChild(spanText);
        root.appendChild(result);

    }

    _htmlFactory() {
        const self = this;

        return {
            testName: function () {
                const span = document.createElement("span");
                span.innerText = self.name;

                return span;
            },
            testStatus: function () {
                const span = document.createElement("span");

                if (self.failed.length) {
                    span.innerText = "FAIL:";
                    span.style.cssText += self.styles.fail;
                } else {
                    span.innerText = "PASS:";
                    span.style.cssText += self.styles.success;
                }

                return span;
            },
            testResult: function () {
                const div = document.createElement("div");
                div.style.cssText += "margin-bottom: 3px; padding-left: 15px";
                return div;
            },
        }
    }
}

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

/**
 * @param {string} name
 * @param cb
 * @return {*}
 */
function test(name, cb) {
    try {
        cb(name);
    } catch (e) {
        Test.push(false);
        console.error(`Error inside test "${name}"`, e);
    }

    const test = new Test(name);
    test.printResult();

    /**
     * note
     *  Сформировать отдельный объект с результатами и готовой
     *  версткой, которую потом вставить?
     */

    // Clear
    Test.tests.length = 0;
}

function expect(arg) {
    /**
     * TODO сформировать объект с данными, если появилась ошибка
     *  Из expect всегда есть компаратор, поэтому внутри него можно
     *  сформировать текст, на котором ошибка произошла. Например, expect(2=param).toBe(4=arg);
     *  Значит Я могу в виде строки это составить и запушить в объект с текстом ошибки
     *  Тем самым при рендере сделать доп поле, в которое выводить поломанные expect
     */
    return new Comparator(arg);
}

window.test = test;
window.expect = expect;

console.info("LIB");