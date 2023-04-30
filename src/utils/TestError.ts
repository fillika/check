const SYSTEM_FILES_NAMES = ["check-lib", "index-cf330c86"];

class TestError extends Error {
  stack: string;

  constructor(message: string, options: { stack?: string } = {}) {
    super(message);

    if (!options.stack) {
      options.stack = this.stack;
    }

    this.stack = options.stack
      .split("\n")
      .filter((line) => line.search(new RegExp(SYSTEM_FILES_NAMES.join("|"), "gi")) === -1)
      .join("\n");
  }
}

export default TestError;
