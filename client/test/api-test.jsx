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
        accesstoken: "7fdfdc69-1ba7-492f-b68c-35cfa3515112"
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
    const style = {
      marginTop: '80px'
    };
    return (
      <div style={{...style}}>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    );
  }
}
