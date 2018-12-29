import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./views/App";
import { BrowserRouter } from "react-router-dom";
import { teal, amber } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { Provider } from "mobx-react";
import AppState from "./store/app-state";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    accent: amber,
    type: "light"
  },
  typography: {
    useNextVariants: true
  }
});

const createApp = TheApp => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById("jss-server-side");
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <TheApp />;
    }
  }
  return Main;
};

const initialState = window.__INITIAL_STATE__ || {};
const root = document.getElementById("app");
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const render = C => {
  renderMethod(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <C />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  );
};

render(createApp(App));

if (module.hot) {
  module.hot.accept("./views/App.jsx", () => {
    var NextApp = require("./views/App.jsx").default;
    render(createApp(NextApp));
  });
}
