interface IStateManager {
    getTestByID(id: string): ITestObject;

    getTestsGroup(): Map<string, string[]>;

    setTestToTheGroup(groupName: string, testID: string): void;

    getReport(): Report;

    runTests(arrayWithTestIDs: string[]): Promise<ITestObject>[];

    addTest(name: string, test: ITestObject): void;

    addToReportSuccess(): void;

    addToReportTotal(): void;

    addToReportFail(): void;
}