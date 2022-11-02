import test from "./test.js";
import expect from "./expect.js";
import State from "./State.js";
import group from "./group.js";
import StateManager from "./StateManager.js";

window.test = test;
window.expect = expect;
window.group = group;
window.checkLib = {};
window.checkLib.StateManager = new StateManager(State);