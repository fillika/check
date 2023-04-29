import StateManager from "../utils/StateManager";

class Group implements Group {
    name: GroupName;
    tests: Map<TestID, ITestObject>;
    parent: Group;
    children: Group[];

    constructor(name: GroupName) {
        this.name = name;
        this.tests = new Map;
        this.children = [];
        this.parent = null;
    }

    getName() {
        return this.name;
    }

    setParent(parent: Group) {
        this.parent = parent;
    }

    addChild(child: Group) {
        this.children.push(child);
    }

    addTest(id: TestID, test: ITestObject) {
        if (!this.tests.has(id)) {
            this.tests.set(id, test);
        }
    }
}

// create group for tests without group
StateManager.pushParentGroup("Without group", new Group("Without group"))

// Mutate group for creating a tree of groups
let g: Group = null;

function group(name: GroupName, cb: () => void) {
    // Create a object GROUP and pass it next
    // Main idea is to create kind of a tree of groups
    if (g === null) {
        g = new Group(name);
    } else {
        const child = new Group(name);
        child.setParent(g);
        g.addChild(child);
        g = child;
    }

    StateManager.on(
        "addTest",
        (id: TestID, test: ITestObject) => {
            g.addTest(id, test);
            StateManager.setTestToTheGroup(name, id);
            test.setGroupName(name);
        },
    );

    cb();

    if (g.parent === null) {
        StateManager.pushParentGroup(name, g);
    }

    g = g.parent;
    StateManager.off("addTest")
}

export default group;