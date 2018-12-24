import React from "react";
import { Link } from "react-router-dom";
import Routers from "../config/router";

class App extends React.Component {
  render() {
    return [
      <div>
        <Link to="/">首页</Link>
        <Link to="/detail">详情页</Link>
      </div>,
      <Routers />
    ];
  }
}
export default App;
