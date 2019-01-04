import React, { Component } from 'react';
import Routers from '../config/router';
import MainAppBar from './layout/app-bar';

class App extends Component {
  render() {
    return [<MainAppBar key="app-bar" />, <Routers key="routes" />];
  }
}
export default App;
