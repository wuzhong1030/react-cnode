import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';

import { TextField, Radio, Button, Snackbar } from '@material-ui/core';
import IconReplay from '@material-ui/icons/Replay';
import { withStyles } from '@material-ui/core/styles';

import Container from '../layout/container';
import { createStyle } from './style';
import { tabs } from '../../utils/variable-define';

import { inject, observer } from 'mobx-react';

@inject(stores => {
  return {
    topicStore: stores.topicStore,
  };
})
@observer
class TopicCreate extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tab: '',
      open: false,
      message: '',
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChangeTitle(e) {
    this.setState({
      title: e.target.value.trim(),
    });
  }

  handleChangeContent(value) {
    this.setState({
      content: value,
    });
  }

  handleChangeRadio(e) {
    this.setState({
      tab: e.currentTarget.value,
    });
  }

  handleCreate() {
    const { tab, title, content } = this.state;
    if (!title) {
      this.showMessage('标题不能为空');
      return;
    }
    if (!content) {
      this.showMessage('内容不能为空');
      return;
    }
    if (!tab) {
      this.showMessage('标签不能为空');
      return;
    }
    this.props.topicStore
      .createTopic(tab, title, content)
      .then(res => {
        this.context.router.history.push('/list');
      })
      .catch(err => {
        console.log(err);
        this.showMessage(err);
      });
  }

  showMessage(message) {
    this.setState({
      open: true,
      message,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { classes } = this.props;

    const { message, open } = this.state;
    return (
      <Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          open={open}
          onClose={this.handleClose}
        />
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={this.state.title}
            onChange={this.handleChangeTitle}
          />
          <SimpleMDE
            onChange={this.handleChangeContent}
            value={this.state.content}
            options={{
              toolbar: false,
              spellChecker: false,
              placeholder: '发表你的意见',
            }}
          />
          <div>
            {Object.keys(tabs).map(tab => {
              if (tab !== '' && tab !== 'good') {
                return (
                  <span className={classes.radioItem} key={tab}>
                    <Radio
                      value={tab}
                      checked={tab === this.state.tab}
                      onChange={this.handleChangeRadio}
                    />
                    {tabs[tab]}
                  </span>
                );
              }
            })}
          </div>
          <Button
            fab="true"
            color="primary"
            onClick={this.handleCreate}
            className={classes.createBtn}
          >
            <IconReplay />
          </Button>
        </div>
      </Container>
    );
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
};

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(createStyle)(TopicCreate);
