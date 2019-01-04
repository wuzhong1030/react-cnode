import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopicDetail from '../views/topic-detail/index';
import TopicList from '../views/topic-list/index';
import UserLogin from '../views/user/login';
import UserInfo from '../views/user/info';

import Test from '../../client/test/api-test';

export default () => [
  <Route
    exact
    path="/"
    render={() => <Redirect to="/list" />}
    key="redirect"
  />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route exact path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route exact path="/user/login" component={UserLogin} key="login" />,
  <Route exact path="/user/info" component={UserInfo} key="info" />,
  <Route exact path="/test" component={Test} key="test" />,
];
