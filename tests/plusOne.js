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