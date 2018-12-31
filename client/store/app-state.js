import { observable, computed, action } from "mobx";
import { post, get } from "../utils/request";

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      recentTopics: [],
      recentReplies: [],
      syncing: false
    },
    collections: {
      syncing: false,
      list: []
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

  @action getUserCollention() {
    this.user.collections.syncing = true;
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${this.user.info.loginname}`)
        .then(res => {
          if (res.success) {
            this.user.collections.list = res.data;
            resolve();
          } else {
            reject(res);
          }
          this.user.collections.syncing = false;
        })
        .catch(err => {
          this.user.collections.syncing = false;
          reject(err);
        });
    });
  }
}
