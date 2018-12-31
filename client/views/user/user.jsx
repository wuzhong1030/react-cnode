import React, { Component } from "react";
import PropTypes from "prop-types";
import UserIcon from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import userStyle from "./style/user-style";
import Container from "../layout/container";
import Avatar from "@material-ui/core/Avatar";

class UserWrapper extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const user = {};
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg}>
            {user.avatar_url ? (
              <Avatar className={classes.avatarImg} src={user.avatar_url} />
            ) : (
              <Avatar className={classes.avatarImg}>
                <UserIcon />
              </Avatar>
            )}
            <span className={classes.userName}>
              {user.loginname || "未登录"}
            </span>
          </div>
        </div>
        {this.props.children}
      </Container>
    );
  }
}

UserWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default withStyles(userStyle)(UserWrapper);
