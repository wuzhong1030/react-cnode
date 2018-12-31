import { observable, computed, action } from "mobx";
import { post } from "../utils/request";

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {}
  };

  @action login(accesstoken) {
    return new Promise((resolve, reject) => {
      post(
        "/user/login",
        {},
        {
          accesstoken
        }
      )
        .then(res => {
          if (res.success) {
            this.user.isLogin = true;
            this.user.info = res.data;
            resolve(res.data);
          } else {
            reject(res);
          }
        })
        .catch(reject);
    });
  }
}
