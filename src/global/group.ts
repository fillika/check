import StateManager from "../utils/StateManager";

function group(name: string, cb: () => void) {
    StateManager.on(
        "addTest",
        (id: string, test: ITestObject) => {
            StateManager.setTestToTheGroup(name, id);
            test.setGroupName(name);
        },
    );

    cb();

    StateManager.off("addTest")
}

export default group;