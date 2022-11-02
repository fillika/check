class TestError extends Error {
    constructor(message, { stack }) {
        super(message);

        this.stack = stack;
    }
}

export default TestError;