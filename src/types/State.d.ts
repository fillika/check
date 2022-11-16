type Report = {
    tests: {
        total: number,
        success: number,
        fail: number,
    }
}

type StateTests = Map<string, ITestObject>
type StateGroups = Map<string, string[]>

interface IState {
    _report: Report;
    groups: StateGroups;
    tests: StateTests;
    report: Report;
    resetReport: () => void
    addToReport: {
        total(): void;
        success(): void;
        fail(): void;
    }

    add: (name: string, test: ITestObject) => void
}
