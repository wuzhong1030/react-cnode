import { observable, computed, action, extendObservable } from 'mobx';
import { topicSchema, replySchema } from '../utils/variable-define';
import { get, post } from '../utils/request';

const createTopic = topic => {
  return Object.assign({}, topicSchema, topic);
};

const createReply = reply => {
  return Object.assign({}, replySchema, reply);
};

export class Topic {
  constructor(data, isDetail) {
    extendObservable(this, data);
    this.isDetail = isDetail;
  }
  @observable syncing = false;
  @observable createReplies = [];
  @action doReply(content) {
    return new Promise((resolve, reject) => {
      post(
        `/topic/${this.id}/replies`,
        {
          needAccessToken: true,
        },
        { content }
      )
        .then(res => {
          if (res.success) {
            this.createReplies.push(
              createReply({
                id: res.data.reply_id,
                content,
                create_at: Date.now(),
              })
            );
            resolve();
          } else {
            reject(res);
          }
        })
        .catch(reject);
    });
  }
}

export class TopicStore {
  @observable topics;
  @observable details;
  @observable syncing;
  @observable createdTopics = [];

  constructor({ syncing = false, topics = [], details = [] } = {}) {
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
    this.details = details.map(topic => new Topic(createTopic(topic)));
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail;
      return result;
    }, {});
  }

  @action fetchTopics(tab = '') {
    return new Promise((resolve, reject) => {
      this.syncing = true;
      this.topics = [];
      get('/topics', {
        mdrender: false,
        tab,
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

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id]);
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        })
          .then(res => {
            if (res.success) {
              const topic = new Topic(createTopic(res.data));
              this.details.push(topic);
            } else {
              reject(topic);
            }
          })
          .catch(reject);
      }
    });
  }

  @action createTopic(tab, title, content) {
    return new Promise((resolve, reject) => {
      post(
        '/topics',
        {
          needAccessToken: true,
        },
        { title, tab, content }
      )
        .then(res => {
          console.log('res', res)
          if (res.success) {
            const topic = {
              title,
              tab,
              content,
              id: res.topic_id,
              create_at: Date.now(),
            };
            this.createdTopics.push(new Topic(createTopic(topic)));
            resolve();
          } else {
            reject(res)
          }
        })
        .catch(reject);
    });
  }
}

export default TopicStore;
