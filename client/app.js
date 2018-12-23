import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App.jsx";

const root = document.getElementById("app");
const render = C => {
  ReactDOM.hydrate(
    <AppContainer>
      <C />
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    var NextApp = require("./App.jsx").default;
    render(NextApp);
  });
}
