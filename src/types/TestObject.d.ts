interface ITestObject {
    name: string;
    result: boolean;
    groupName: string;
    run: () => Promise<ITestObject>;

    setGroupName(groupName: string): void;

    get id(): string;
}

type CallbackInTestObject = () => Promise<any> | void | undefined | null;