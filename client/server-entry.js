import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider, useStaticRendering } from "mobx-react";
import App from "./views/App";
import { createStoreMap } from "./store";
import JssProvider from "react-jss/lib/JssProvider";
import { MuiThemeProvider } from "@material-ui/core/styles";

// 让mobx在服务端渲染的时候避免重复数据变换
useStaticRendering(true);

export default (
  stores,
  routerContext,
  sheetsRegistry,
  generateClassName,
  theme,
  sheetsManager,
  url
) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
);

export { createStoreMap };
