import { observable, toJS, computed, action, extendObservable } from "mobx";
import { topicSchema } from "../utils/variable-define";
import { get } from "../utils/request";

const createTopic = topic => {
  return Object.assign({}, topicSchema, topic);
};

export class Topic {
  constructor(data) {
    extendObservable(this, data);
  }
  @observable syncing = false;
}

export class TopicStore {
  @observable topics;
  @observable syncing;

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }

  @action fetchTopics() {
    return new Promise((resolve, reject) => {
      this.syncing = true;
      this.topics = [];
      get("/topics", {
        mdrender: false
      })
        .then(res => {
          if (res.success) {
            res.data.forEach(topic => {
              this.addTopic(topic);
            });
            resolve();
          } else {
            reject();
          }
          this.syncing = false;
        })
        .catch(err => {
          console.log(err);
          reject(err);
          this.syncing = false;
        });
    });
  }
}

export default TopicStore;
