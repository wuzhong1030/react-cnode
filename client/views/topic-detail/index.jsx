import React, { Component } from "react";
import PropTypes from "prop-types";
import marked from "marked";
import { Helmet } from "react-helmet";
import { inject, observer } from "mobx-react";
import Container from "../layout/container";
import { topicDetailStyle } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Paper, LinearProgress } from "@material-ui/core/Paper";
import { Reply } from "./reply";

@inject(stores => stores.topicStore)
export default class TopicDetail extends Component {
  render() {
    return <div>TopicDetail</div>;
  }
}
