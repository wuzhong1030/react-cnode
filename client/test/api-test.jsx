import React, { Component } from "react";
import axios from "axios";

export default class Test extends Component {
  getTopics = () => {
    axios.get("/api/topics").then(res => {
      console.log(res);
    });
  };
  login = () => {
    axios
      .post("/api/user/login", {
        accessToken: "72c0c74c-a7f7-4278-ac80-98e71a857ac2"
      })
      .then(res => {
        console.log(res);
      });
  };
  markAll = () => {
    axios.get("/api/message/mark_all?needAccessToken=true").then(res => {
      console.log(res);
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
