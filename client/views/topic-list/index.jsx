import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { PropTypes } from "prop-types";
import { AppState } from "../../store/app-state";
import Helmet from "react-helmet";
import Container from "../layout/container"

@inject("appState")
@observer
export default class TopicList extends Component {
  asyncBootstrap() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.props.appState.count = 1000;
        resolve(true);
      });
    });
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>this is topicList</title>
          <meta name="description" content="this is topicList description" />
        </Helmet>
        <div>
        xxx</div>
      </Container>
    );
  }

}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
};
