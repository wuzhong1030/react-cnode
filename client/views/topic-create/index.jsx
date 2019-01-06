import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';

import { TextField, Radio, Button } from '@material-ui/core';
import { IconReplay } from '@material-ui/icons/Replay';
import { withStyles } from '@material-ui/core/styles';

import Container from '../layout/container';
import createStyle from './style';
import { tabs } from '../../utils/variable-define';

class TopicCreate extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      title: '',
      newReply: '',
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
  }

  handleChangeTitle() {}

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={this.state.title}
            onChange={this.handleChangeTitle}
          />
          <SimpleMDE
            onChange={this.handleChangeContent}
            value={this.state.newReply}
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
                  <span className={classes.radioItem}>
                    <Radio
                      value={tab}
                      checked={tab === this.state.tab}
                      onChange={this.handleChangeRadio}
                    >
                      {tabs[tab]}
                    </Radio>
                  </span>
                );
              }
            })}
          </div>
          <Button
            fab
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
