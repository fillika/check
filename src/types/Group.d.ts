type GroupName = string
type TestID = string

interface Group {
    name: GroupName;
    tests: Map<TestID, ITestObject>;
    parent: Group | null;
    children: Group[];

    addTest(id: TestID, test: ITestObject): void;
}