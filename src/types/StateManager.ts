interface IStateManager {
    getTestByID(id: string): ITestObject;

    setTestToTheGroup(groupName: string, testID: string): void;

    getReport(): Report;

    runTests(arrayWithTestIDs: string[]): Promise<ITestObject>[];

    addTest(name: string, test: ITestObject): void;

    addToReportSuccess(): void;

    addToReportTotal(): void;

    addToReportFail(): void;

    pushParentGroup(groupName: string, g: Group): void;
}