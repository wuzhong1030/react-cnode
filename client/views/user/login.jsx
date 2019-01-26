import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import UserWrapper from './user';
import loginStyle from './style/login-style';

import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

@inject(store => {
  return {
    appState: store.appState,
    user: store.appState.user,
  };
})
@observer
class UserLogin extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      accessToken: '',
      helpText: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  getFrom(location) {
    location = location || this.props.location;
    const query = queryString.parse(location.search);
    return query.from || '/user/info';
  }

  handleInput(e) {
    this.setState({
      accessToken: e.target.value.trim(),
    });
    this.setState({
      helpText: '',
    });
  }

  handleLogin() {
    if (!this.state.accessToken) {
      return this.setState({
        helpText: '请输入accessToken',
      });
    }
    this.setState({
      helpText: '',
    });
    return this.props.appState
      .login(this.state.accessToken)
      .then(res => {
        this.context.router.history.replace('/user/info');
      })
      .catch(err => {
        this.setState({
          helpText: err.data.error_msg,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const from = this.getFrom();
    const isLogin = this.props.user.isLogin;
    if (isLogin) {
      return <Redirect to={from} />;
    }
    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="accessToken"
            placeholder="请输入accessToken"
            required
            id="standard-error"
            helperText={this.state.helpText}
            value={this.state.accessToken}
            onChange={this.handleInput}
            className={classes.input}
            autoFocus={true}
            autoComplete=""
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            登陆
          </Button>
        </div>
      </UserWrapper>
    );
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(loginStyle)(UserLogin);
