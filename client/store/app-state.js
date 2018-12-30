import { observable, computed, action } from "mobx";
import { post } from "../utils/request";

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {}
  };

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post("/api/user/login", {
        accessToken
      })
        .then(res => {
          if (res.success) {
            this.user.isLogin = true;
            this.user.info = res.data;
            resolve();
          } else {
            reject(res);
          }
        })
        .catch(reject);
    });
  }
}
