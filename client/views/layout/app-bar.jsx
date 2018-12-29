import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
  root: {
    width: "100%"
  },
  mgr: {
    marginRight: 14
  },
  flex: {
    flex: 1,
    marginLeft: 20
  }
};

class MainAppBar extends Component {
  onHomeIconClick = () => {};
  handleLogin = () => {};
  handleCreateTopic = () => {};
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              CNode
            </Typography>
            <IconButton
              color="default"
              aria-label="Edit"
              onClick={this.handleCreateTopic}
              className={classes.mgr}
            >
              <EditIcon />
            </IconButton>
            <Button color="inherit" raised="true" onClick={this.handleLogin}>
              登陆
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainAppBar);
