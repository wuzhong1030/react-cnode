import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./views/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import appState from "./store/app-state";

const root = document.getElementById("app");
const render = C => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState}>
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
