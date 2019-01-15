import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { TopicPrimaryStyle, TopicSecondaryStyle } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { tabs } from '../../utils/variable-define';
import cs from 'classnames';
import moment from 'moment'; 

const Primary = ({ classes, topic }) => {
  const classNames = cs({
    [classes.tab]: true,
    [classes.top]: topic.top,
  });
  return (
    <div className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  );
};

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.replyCount}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间: {`${moment(topic.create_at).format('YYYY-MM-DD')}`}</span>
  </span>
);

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<PrimaryStyle topic={topic} />}
      secondary={<SecondaryStyle topic={topic} />}
    />
  </ListItem>
);

const PrimaryStyle = withStyles(TopicPrimaryStyle)(Primary);
const SecondaryStyle = withStyles(TopicSecondaryStyle)(Secondary);

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
};
Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
};
TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
};

export default TopicListItem;
