import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { PropTypes } from 'prop-types';

import { inject, observer } from 'mobx-react';

const styles = {
  root: {
    width: '100%',
  },
  mgr: {
    marginRight: 14,
  },
  flex: {
    flex: 1,
    marginLeft: 20,
  },
};

@inject(stores => {
  return {
    appState: stores.appState,
  };
})
@observer
class MainAppBar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  onHomeIconClick = () => {
    this.context.router.history.push('/list');
  };
  handleLogin = () => {
    if (this.props.appState.user.isLogin) {
      this.context.router.history.push('/user/info');
    } else {
      this.context.router.history.push('/user/login');
    }
  };
  handleCreateTopic = () => {
    this.context.router.history.push('/create');
  };
  render() {
    const classes = this.props.classes;
    const { user } = this.props.appState;
    console.log(user);
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              CNode
            </Typography>
            <IconButton
              color="default"
              aria-label="Edit"
              onClick={this.handleCreateTopic}
              className={classes.mgr}
            >
              <EditIcon />
            </IconButton>
            {user.isLogin ? (
              user.info.loginname
            ) : (
              <Button onClick={this.handleLogin}>登陆</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainAppBar);
