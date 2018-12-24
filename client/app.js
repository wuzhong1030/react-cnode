import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./views/App";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("app");
const render = C => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <C />
      </BrowserRouter>
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
