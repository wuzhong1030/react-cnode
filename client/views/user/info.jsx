import React, { Component } from "react";
import UserWrapper from "./user";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { infoStyle } from "./style/user-info-style";
import { ListItemText } from "@material-ui/core/ListItemText";
import { Paper } from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core/Typography";

const TopicItem = ({ topic, onClick }) => {
  return (
    <ListItem button onClick={onClick}>
      <Avatar src={topic.author.avatar_url} />
      <ListItemText
        primary={topic.title}
        secondary={`最新回复：${topic.last_reply_at}`}
      />
    </ListItem>
  );
};

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

@inject(stores => {
  user: stores.appState.user;
  appState: appState;
})
@observer
class UserInfo extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount() {
    if (!this.props.user.isLogin) {
      this.context.router.history.replace("/user/login");
    } else {
      this.props.appState.getUserDetail();
    }
  }
  render() {
    const { classes } = this.props;
    const topics = this.props.user.dertail.recentTopics;
    const replies = this.props.user.dertail.recentReplies;
    const collections = [];
    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} align="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>最近发布的话题</span>
                </Typography>
                <List>
                  {topics.length > 0 ? (
                    topics.map(topic => (
                      <TopicItem topic={topic} key={topic.id} />
                    ))
                  ) : (
                    <Typography>最近没有发布过话题</Typography>
                  )}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>收藏的话题</span>
                </Typography>
                <List>
                  {collections.length > 0 ? (
                    collections.map(topic => (
                      <TopicItem topic={topic} key={topic.id} />
                    ))
                  ) : (
                    <Typography>还没有收藏的话题</Typography>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    );
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

UserInfo.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

export default withStyles(infoStyle)(UserInfo);
