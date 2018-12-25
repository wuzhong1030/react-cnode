import React, { Component } from "react";
import axios from "axios";

export default class Test extends Component {
  getTopics = () => {
    axios
      .get("/api/topics")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  login = () => {
    axios
      .post("/api/user/login", {
        accesstoken: "cb903f1c-eee1-40f2-b011-a6a8b66f17f0"
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  markAll = () => {
    axios
      .get("/api/message/mark_all?needAccessToken=true")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    );
  }
}
