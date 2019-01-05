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
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
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
        </div>
      </Container>
    );
  }
}
