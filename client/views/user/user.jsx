import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import userStyle from "./style/user-style";

const UserWrapper = () => {
  const { classes } = this.props;
  return <div className={classes.root}>1111</div>;
};

export default withStyles(userStyle)(UserWrapper);
