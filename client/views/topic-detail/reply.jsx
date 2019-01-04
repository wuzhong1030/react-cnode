import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import Avatar from '@material-ui/core/Avatar';
import { replyStyle } from './styles';
import { withStyles } from '@material-ui/core/styles';
import dateformat from 'dateformat';

const Reply = ({ reply, classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Avatar src={reply.author.avatar_url} />
      </div>
      <div className={classes.right}>
        <span className={classes.loginname}>{`${reply.author.loginname}`}</span>
        <span className={classes.createAt}>{`${dateformat(
          reply.create_at,
          'yyyy-MM-dd'
        )}`}</span>
        <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
      </div>
    </div>
  );
};

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(replyStyle)(Reply);
