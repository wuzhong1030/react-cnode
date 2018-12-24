import { observable, computed, autorun } from "mobx";

class AppState {
  @observable count = 1;
  @observable name = "Jake";
  @computed get msg() {
    return `${this.name} say count is ${this.count}`;
  }
}

autorun(() => {
  console.log("autorun");
});

const appState = new AppState();

export default appState;
