import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { PropTypes } from "prop-types";
import { AppState } from "../../store/app-state";

@inject("appState")
@observer
export default class TopicList extends Component {
  render() {
    return (
      <div>
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
