class TestError extends Error {
    stack: string;

    constructor(message: string, options: { stack: string }) {
        super(message);

        this.stack = options.stack;
    }
}

export default TestError;