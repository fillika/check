import TestError from "./TestError";

class Comparator implements IComparator {
  param: any;

  constructor(param: any) {
    this.param = param;
  }

  get not() {
    const self = this;

    return {
      toBe(arg: any) {
        if (self.param === arg) error(`expect(${self.param}).not.toBe(${arg})`);
      },
      toEqual(arg: any) {
        if (self.deepEqual(self.param, arg))
          error(
            `expect(${JSON.stringify(self.param)}).not.toEqual(${JSON.stringify(
              arg
            )})`
          );
      },
      toBeNull() {
        if (self.param === null) error(`expect(${self.param}).not.toBeNull()`);
      },
      toBeFalsy() {
        if (self.param === false)
          error(`expect(${self.param}).not.toBeFalsy()`);
      },
      toBeTruthy() {
        if (self.param === true)
          error(`expect(${self.param}).not.toBeTruthy()`);
      },
      toBeUndefined() {
        if (self.param === undefined)
          error(`expect(${self.param}).not.toBeUndefined()`);
      },
    };
  }

  deepEqual(objA: any, objB: any, map = new WeakMap()) {
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
      typeof objA !== "object" ||
      objA === null ||
      typeof objB !== "object" ||
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
  }

  toBe(arg: any) {
    if (this.param !== arg) error(`expect(${this.param}).toBe(${arg})`);
  }

  // deep equal
  toEqual(arg: any) {
    if (!this.deepEqual(this.param, arg))
      error(
        `expect(${JSON.stringify(this.param)}).toEqual(${JSON.stringify(arg)})`
      );
  }

  toBeNull() {
    if (this.param !== null) error(`expect(${this.param}).toBeNull()`);
  }

  toBeFalsy() {
    if (this.param !== false) error(`expect(${this.param}).toBeFalsy()`);
  }

  toBeTruthy() {
    if (this.param !== true) error(`expect(${this.param}).toBeTruthy()`);
  }

  toBeUndefined() {
    if (this.param !== undefined)
      error(`expect(${this.param}).toBeUndefined()`);
  }
}

function error(text: string) {
  throw new TestError(`Test failure: ${text}`);
}

export default Comparator;
