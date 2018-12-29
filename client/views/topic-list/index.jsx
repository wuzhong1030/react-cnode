import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { PropTypes } from "prop-types";
import { AppState, TopicStore } from "../../store";

import Helmet from "react-helmet";
import Container from "../layout/container";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";

import TopicListItem from "./list-item";
import { List } from "@material-ui/core/List";

// @inject(stores => ({ ...stores }))
@inject(stores => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore
  };
})
@observer
export default class TopicList extends Component {
  state = {
    tableIndex: 0
  };

  asyncBootstrap() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.props.appState.count = 1000;
        resolve(true);
      });
    });
  }

  componentDidMount() {
    this.props.topicStore.fetchTopics();
  }

  handleChange = (e, index) => {
    this.setState({
      tableIndex: index
    });
  };

  handleItemClick = () => {};

  render() {
    const { tableIndex } = this.state;
    const { topicStore } = this.props;

    const topicList = topicStore.topics;
    const syncingTopics = topicStore.syncing;
    console.log(topicList)
    return (
      <Container>
        <Helmet>
          <title>this is topicList</title>
          <meta name="description" content="this is topicList description" />
        </Helmet>
        <Tabs value={tableIndex} onChange={this.handleChange}>
          <Tab label="全部" />
          <Tab label="精华" />
          <Tab label="分享" />
          <Tab label="问答" />
          <Tab label="招聘" />
          <Tab label="客户端测试" />
        </Tabs>
        
      </Container>
    );
  }
}
TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore)
};
