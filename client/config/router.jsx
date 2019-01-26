import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import TopicDetail from '../views/topic-detail/index';
import TopicList from '../views/topic-list/index';
import UserLogin from '../views/user/login';
import UserInfo from '../views/user/info';
import TopicCreate from '../views/topic-create/index';

import Test from '../../client/test/api-test';

import { inject, observer } from 'mobx-react';
import { PropTypes } from 'prop-types';

const PriviateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/user/login',
            search: `?from=${rest.path}`,
          }}
        />
      )
    }
  />
);

const InjectPriviateRoute = withRouter(inject(store => {
  return {
    isLogin: store.appState.user.isLogin,
  };
})(observer(PriviateRoute)));

PriviateRoute.propTypes = {
  isLogin: PropTypes.bool,
  component: PropTypes.element.isRequired,
};
PriviateRoute.defaultProps = {
  isLogin: false,
};

export default () => [
  <Route
    exact
    path="/"
    render={() => <Redirect to="/list" />}
    key="redirect"
  />,
  <Route path="/list" component={TopicList} key="list" />,
  <InjectPriviateRoute path="/create" component={TopicCreate} key="create" />,
  <Route exact path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route exact path="/user/login" component={UserLogin} key="login" />,
  <InjectPriviateRoute
    exact
    path="/user/info"
    component={UserInfo}
    key="info"
  />,
  <Route exact path="/test" component={Test} key="test" />,
];
