import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';

import { TextField, Radio, Button, Snackbar } from '@material-ui/core';
import IconReplay from '@material-ui/icons/Replay';
import { withStyles } from '@material-ui/core/styles';

import Container from '../layout/container';
import { createStyle } from './style';
import { tabs } from '../../utils/variable-define';

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
  }

  handleChangeTitle(e) {
    this.setState({
      title: e.target.value.trim(),
    });
  }

  handleChangeContent(value) {
    this.setState({
      newReply: value,
    });
  }

  handleChangeRadio(e) {
    this.setState({
      title: e.currentTarget.value,
    });
  }

  handleCreate() {
    const { tab, title, content } = this.state;
    if (!title) {
      return this.setState({
        message: '标题是必填项',
      });
    } else if (!content) {
      return this.setState({
        message: '请填写帖子内容',
      });
    } else {

    }
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
          message={message}
          open={open}
          onRequestClose={this.handleClose}
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
              if (tab !== '' || tab !== 'good') {
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

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(createStyle)(TopicCreate);
