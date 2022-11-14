import StateManager from "../utils/StateManager.js";

/**
 * @param {string} name
 * @param {*} cb
 */
function group(name, cb) {
    StateManager.on(
        "addTest",
        id => StateManager.setTestToTheGroup(name, id),
    );

    cb();

    StateManager.off("addTest")
}

export default group;