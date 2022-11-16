import StateManager from "../utils/StateManager";

function group(name: string, cb: () => void) {
    StateManager.on(
        "addTest",
        (id: string) => StateManager.setTestToTheGroup(name, id),
    );

    cb();

    StateManager.off("addTest")
}

export default group;