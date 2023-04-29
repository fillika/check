/**
 * @param {number} int
 * @return {*}
 */
function plusOne(int) {
    return int + 1;
}

test("Alone test without group", () => {
    const int = 1,
        result = plusOne(int);

    expect(result).toBe(2);
    expect(result).not.toBe(int);
})

test("Another alone test without group", () => {
    const int = 100,
        result = plusOne(int);

    expect(result).toBe(101);
    expect(result).not.toBe(101);
})

test("Test with object as argument", () => {
    const a = {
        user: "John",
        age: 25,
    },
        b = {
            user: "Doe",
            age: 24,
        };

    expect(a).toEqual(b);
})

test("Test with array as argument", () => {
    const a = [1, 2, 3],
        b = [1, 2, 3];

    expect(a).toEqual(b);
    expect(a).not.toEqual(b);
})

group(
    "Test [plusOne] function with correct result",
    () => {
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

        test("Very long test", async () => {
            let x = 10;

            await new Promise(resolve => {
                setTimeout(() => {
                    resolve(20)
                }, 2500)
            }).then(int => x = int)

            expect(x).toBe(201);
        })
    },
)

group(
    "Test [plusOne] function with ERROR",
    () => {
        test("Doesn't exist", () => {
            funcDoesntExist();
        })

        test("Incorrect test", () => {
            const int = 1,
                result = plusOne(int);

            expect(result).toBe(int);
        })

        test("Test with Error", () => {
            throw new Error("My custom error");
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
    },
)

group(
    "Test with same group",
    () => {
        test("John", () => {
            expect(2).toBe(2)
        })
    },
)

group(
    "Test with same group",
    () => {
        test("Doe", () => {
            expect(3).toBe(3)
        })
    },
)

group("Test with group inside", () => {
    group("Test children 1", () => {
        test("Foo", () => {})
        test("Bar", () => {})

        group("Test children 2", () => {
            test("John", () => {
                expect(2).toBe(2)
            })

            test("Dina", () => {
                expect(2).toBe(2)
            })

            test("Castle", () => {
                expect(2).toBe(2)
            })
        })
    })

    test("Doe", () => {})
})

group("Test with group inside", () => {
    group("Test children 22", () => {
        test("Foo", () => {})
        test("Bar", () => {})

        group("Test children 32", () => {
            test("John", () => {
                expect(2).toBe(2)
            })

            test("Dina", () => {
                expect(2).toBe(2)
            })

            test("Castle", () => {
                expect(2).toBe(2)
            })
        })
    })

    test("Doe 2", () => {})
})