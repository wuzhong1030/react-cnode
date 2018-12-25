import { observable, computed, autorun, action } from "mobx";

export default class AppState {
  @observable count = 1;
  @observable name = "Jake";
  @computed get msg() {
    return `${this.name} say count is ${this.count}`;
  }
  @action add() {
    this.count += 1;
  }
  @action changeName (name) {
    this.name = name
  }
}

