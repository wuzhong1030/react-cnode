import { observable, computed, action } from "mobx";
import { post } from "../utils/request";
import { get } from "https";

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      recentTopics: [],
      recentReplies: [],
      syncing: false
    }
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

  @action getUserDetail() {
    this.user.detail.syncing = true;
    return new Promise((resolve, reject) => {
      get(`/user/${this.user.info.loginname}`)
        .then(res => {
          if (res.success) {
            this.user.detail.recentTopics = res.data.recent_topics;
            this.user.detail.recentReplies = res.data.recent_replies;
            resolve();
          } else {
            reject(res);
          }
          this.user.detail.syncing = false;
        })
        .catch(err => {
          this.user.detail.syncing = false;
          reject(err);
        });
    });
  }
}
