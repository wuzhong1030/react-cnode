import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import Container from '../layout/container';
import { topicDetailStyle } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Paper, CircularProgress } from '@material-ui/core';
import Reply from './reply';
import SimpleMDE from 'react-simplemde-editor';
import dateformat from 'dateformat';

@inject(stores => {
  return {
    topicStore: stores.topicStore,
  };
})
@observer
class TopicDetail extends Component {
  state = {
    newReply: ''
  }
  constructor(props) {
    super(props)
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this)
  }
  componentDidMount() {
    this.props.topicStore.getTopicDetail(this.getTopicId());
  }

  getTopicId() {
    return this.props.match.params.id;
  }

  handleNewReplyChange() {

  }

  render() {
    const { classes } = this.props;
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
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${dateformat(
              topic.last_reply_at,
              'yy年MM月dd日'
            )}`}</span>
          </header>
          <section>
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
          </section>
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

export default withStyles(topicDetailStyle)(TopicDetail);
