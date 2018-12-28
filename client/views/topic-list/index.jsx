import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { PropTypes } from "prop-types";
import { AppState } from "../../store/app-state";
import Helmet from "react-helmet";
// import Button from "material-ui/Button";
import Button from "@material-ui/core/Button";

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
      <div>
        <Helmet>
          <title>this is topicList</title>
          <meta name="description" content="this is topicList description" />
        </Helmet>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <input type="text" onChange={this.changeName} />
        TopicList {this.props.appState.msg}
      </div>
    );
  }

  changeName = e => {
    this.props.appState.changeName(e.target.value);
  };
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
};
