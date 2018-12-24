import React from "react";
import { Route, Redirect } from "react-router-dom";
import TopicDetail from "../views/topic-detail/index";
import TopicList from "../views/topic-list/index";

export default () => [
  <Route exact path="/" render={() => <Redirect to="/list" />} />,
  <Route path="/list" component={TopicList} />,
  <Route exact path="/detail" component={TopicDetail} />
];
