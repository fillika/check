interface ITestObject {
    result: boolean;
    name: string;
    run: () => Promise<ITestObject>
}

type CallbackInTestObject = () => Promise<any> | void | undefined | null;