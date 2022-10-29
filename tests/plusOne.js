import { plusOne } from "../functions";

test("use function [plusOne] with number 34", () => {
    const int = 34,
        result = plusOne(int);

    expect(result).toBe(35);
    expect(result).not.toBe(int);
})

test("use function [plusOne] with number 121", () => {
    const int = 121,
        result = plusOne(int);

    expect(result).toBe(122);
    expect(result).not.toBe(int);
})

test("Incorrect test", () => {
    const int = 1,
        result = plusOne(int);

    expect(result).toBe(int);
})

test("Test with Error", () => {
    throw new Error("My custom error");
})

test("Very long test", async () => {
    let x = 10;

    await new Promise(resolve => {
        setTimeout(() => {
            resolve(20)
        }, 2500)
    }).then(int => x = int)

    expect(x).toBe(201);
})

test("Async test with error", async () => {
    let x = 10;

    await new Promise(resolve => {
        throw new Error("Wrong!");

        setTimeout(() => {
            resolve(20)
        }, 2500)
    }).then(int => x = int)

    expect(x).toBe(201);
})