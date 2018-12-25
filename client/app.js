import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./views/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import AppState from "./store/app-state";

const initialState = window.__INITIAL_STATE__ || {};
const root = document.getElementById("app");
const render = C => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <C />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./views/App.jsx", () => {
    var NextApp = require("./views/App.jsx").default;
    render(NextApp);
  });
}
