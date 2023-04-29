import State from "./State";
import Observer from "./Observer";

class StateManager extends Observer implements IStateManager {
  _state: IState;
  _groups: Map<string, Group[]>;

  constructor(state: IState) {
    super();
    this._state = state;
    this._groups = new Map();
  }

  getTestByID(id: string) {
    return this._state.tests.get(id);
  }

  setTestToTheGroup(groupName: string, testID: string) {
    if (!this._state.groups.has(groupName)) {
      this._state.groups.set(groupName, []);
    }

    const arrayWithTestIDs = this._state.groups.get(groupName);
    this._state.groups.set(groupName, arrayWithTestIDs.concat(testID));
  }

  getReport() {
    return this._state.report;
  }

  getAllTestsIDs() {
    return Array.from(this._state.tests.keys());
  }

  getAllTests() {
    return Array.from(this._state.tests.values());
  }

  runTests(arrayWithTestIDs: string[] = []) {
    this._state.resetReport();
    let tests = [];

    if (!Array.isArray(arrayWithTestIDs))
      throw new Error("Incorrect argument. Must be array of string");

    /**
     * If we have selected tests
     */
    for (const testID of arrayWithTestIDs) {
      if (this._state.tests.has(testID)) {
        tests.push(this._state.tests.get(testID));
      }
    }

    return tests.map((testObj) => testObj.run());
  }

  addTest(id: TestID, test: ITestObject) {
    this._state.add(id, test);
  }

  addToReportSuccess() {
    this._state.addToReport.success();
  }

  addToReportTotal() {
    this._state.addToReport.total();
  }

  addToReportFail() {
    this._state.addToReport.fail();
  }

  pushParentGroup(groupName: string, g: Group) {
    if (!this._groups.has(groupName)) {
      this._groups.set(groupName, []);
    }
    const arr = this._groups.get(groupName);
    arr.push(g);
    this._groups.set(groupName, arr);
  }

  getGroups() {
    return this._groups;
  }

  getTestsWithoutGroup() {
    const tests = new Map(this._state.tests);

    return [...tests.values()].filter((test) => test.groupName === null);
  }

  prepareDataForRender() {
    const groups = this.getGroups();
    const withoutGroup = groups.get("Without group")[0];

    this.getTestsWithoutGroup().forEach((element) => {
      withoutGroup.addTest(element.id, element);
    });

    return Array.from(groups.entries());
  }
}

export default new StateManager(State);
