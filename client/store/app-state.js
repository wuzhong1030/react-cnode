import { observable, computed, action } from "mobx";

export default class AppState {
  constructor({ count, name } = { count: 0, name: "Stone" }) {
    this.count = count;
    this.name = name;
  }
  @observable count;
  @observable name;
  @computed get msg() {
    return `${this.name} say count is ${this.count}`;
  }
  @action add() {
    this.count += 1;
  }
  @action changeName(name) {
    this.name = name;
  }
  // 用于服务端渲染，把改变后的数据传给客户端页面
  toJson() {
    return {
      count: this.count,
      name: this.name
    };
  }
}

