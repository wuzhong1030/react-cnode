import React, { Component } from "react";
import { Link } from "react-router-dom";
import Routers from "../config/router";

class App extends Component {
  render() {
    return [
      <div key="nav">
        <Link to="/">首页</Link>
        <Link to="/detail">详情页</Link>
      </div>,
      <Routers key="routes" />
    ];
  }
}
export default App;
