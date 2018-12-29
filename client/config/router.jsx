import React from "react";
import { Route, Redirect } from "react-router-dom";
import TopicDetail from "../views/topic-detail/index";
import TopicList from "../views/topic-list/index";

import Test from "../../client/test/api-test";

export default () => [
  <Route
    exact
    path="/"
    render={() => <Redirect to="/list" />}
    key="redirect"
  />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route exact path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route exact path="/test" component={Test} key="test" />
];
