import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { PropTypes } from 'prop-types';
import { AppState, TopicStore } from '../../store';

import Helmet from 'react-helmet';
import Container from '../layout/container';

import { Tabs, Tab, List, LinearProgress } from '@material-ui/core';

import TopicListItem from './list-item';
import queryString from 'query-string';
import { tabs } from '../../utils/variable-define';

@inject(stores => ({ ...stores }))
@observer
export default class TopicList extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    const tab = this.getTabValue();
    this.props.topicStore.fetchTopics(tab);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      console.log(this.getTabValue(nextProps.location.search));
      this.props.topicStore.fetchTopics(
        this.getTabValue(nextProps.location.search)
      );
    }
  }

  handleChange = (e, index) => {
    this.context.router.history.push({
      pathname: '/list',
      search: index ? `?tab=${index}` : '',
    });
  };

  getTabValue = (search = this.props.location.search) => {
    const query = queryString.parse(search);
    return query.tab || '';
  };

  handleItemClick(topic) {
    this.context.router.history.push(`/detail/${topic.id}`);
  }

  render() {
    const { topicStore } = this.props;
    const { createdTopics } = topicStore;
    const { user } = this.props.appState;

    const topicList = topicStore.topics;
    const syncing = topicStore.syncing;

    return (
      <Container>
        <Helmet>
          <title>this is topicList</title>
          <meta name="description" content="this is topicList description" />
        </Helmet>
        {syncing ? <LinearProgress /> : null}
        <Tabs value={this.getTabValue()} onChange={this.handleChange}>
          {Object.keys(tabs).map(k => (
            <Tab key={k} label={tabs[k]} value={k} />
          ))}
        </Tabs>
        {(createdTopics && createdTopics.length > 0) ? (
          <List style={{ backgroundColor: '#dfdfdf' }}>
            {createdTopics.map(topic => {
              topic = Object.assign({}, topic, {
                author: user.info,
              });
              return (
                <TopicListItem
                  topic={topic}
                  onClick={this.handleItemClick.bind(this, topic)}
                  key={topic.id}
                />
              );
            })}
          </List>
        ) : null}
        {topicList.length > 0 ? (
          <List>
            {topicList.map(topic => (
              <TopicListItem
                topic={topic}
                onClick={this.handleItemClick.bind(this, topic)}
                key={topic.id}
              />
            ))}
          </List>
        ) : null}
      </Container>
    );
  }
}
TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
};

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
};
