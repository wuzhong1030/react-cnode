import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import Container from '../layout/container';
import { topicDetailStyle } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Paper, CircularProgress, Button, Fab } from '@material-ui/core';
import IconReplay from '@material-ui/icons/Replay';
import Reply from './reply';
import SimpleMDE from 'react-simplemde-editor';
import moment from 'moment';

@inject(stores => {
  return {
    topicStore: stores.topicStore,
    user: stores.appState.user,
  };
})
@observer
class TopicDetail extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      newReply: '',
    };
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this);
    this.handleToLogin = this.handleToLogin.bind(this);
    this.handleReply = this.handleReply.bind(this);
  }
  componentDidMount() {
    this.props.topicStore.getTopicDetail(this.getTopicId());
  }

  getTopicId() {
    return this.props.match.params.id;
  }

  handleToLogin() {
    this.context.router.history.replace(`/user/login`);
  }

  handleNewReplyChange(value) {
    this.setState({
      newReply: value,
    });
  }

  handleReply() {
    const topic = this.props.topicStore.detailMap[this.getTopicId()];
    topic
      .doReply(this.state.newReply)
      .then(() => {
        this.setState({
          newReply: '',
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes, user } = this.props;
    const topic = this.props.topicStore.detailMap[this.getTopicId()];
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress />
          </section>
        </Container>
      );
    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        {topic.createReplies && topic.createReplies.length > 0 ? (
          <Paper elevation={4} className={classes.replies}>
            <header className={classes.replyHeader}>
              <span>我的最新回复</span>
              <span>{`${topic.createReplies.length}`}条</span>
            </header>
            {topic.createReplies.map(reply => (
              <Reply
                key={reply.id}
                reply={Object.assign({}, reply, {
                  author: {
                    avatar_url: user.info.avatar_url,
                    login: user.info.login,
                  },
                })}
              />
            ))}
          </Paper>
        ) : null}
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <div className={classes.noLogin}>
              <span>{`${topic.reply_count} 回复`}</span>
              {!user.isLogin && (
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.mgl}
                  onClick={this.handleToLogin}
                >
                  登陆才可以回复
                </Button>
              )}
            </div>
            <span>{`最新回复 ${moment(topic.last_reply_at).format(
              'yy年MM月dd日'
            )}`}</span>
          </header>

          {user.isLogin ? (
            <section className={classes.replyEditor}>
              <SimpleMDE
                onChange={this.handleNewReplyChange}
                value={this.state.newReply}
                options={{
                  toolbar: false,
                  autofocus: false,
                  spellChecker: false,
                  placeholder: '添加回复',
                }}
              />
              <Fab
                color="primary"
                aria-label="Reply"
                onClick={this.handleReply}
                className={classes.replyBtn}
              >
                <IconReplay />
              </Fab>
            </section>
          ) : null}
          <section>
            {topic.replies.map(reply => (
              <Reply reply={reply} key={reply.id} />
            ))}
          </section>
        </Paper>
      </div>
    );
  }
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(topicDetailStyle)(TopicDetail);
