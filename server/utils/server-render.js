const serialize = require("serialize-javascript");
const ejs = require("ejs");
const Helmet = require("react-helmet").default;
const AsyncBootstrap = require("react-async-bootstrapper").default;
const ReactDomServer = require("react-dom/server");

const SheetsRegistry = require("jss").SheetsRegistry;
const {
  createMuiTheme,
  createGenerateClassName
} = require("@material-ui/core/styles");
const { pink, lightBlue } = require("@material-ui/core/colors");

// 服务端渲染更新数据默认值
const getStoreState = stores => {
  return Object.keys(stores).reduce((result, stroeName) => {
    result[stroeName] = stores[stroeName].toJson();
    return result;
  }, {});
};

module.exports = (bundle, template, req, res) => {
  return new Promise((reslove, reject) => {
    const routerContext = {};

    const createStoreMap = bundle.createStoreMap;
    const createApp = bundle.default;

    const stores = createStoreMap();

    const theme = createMuiTheme({
      palette: {
        primary: lightBlue,
        accent: pink,
        type: "light"
      }
    });
    const sheetsRegistry = new SheetsRegistry();
    // Create a sheetsManager instance.
    const sheetsManager = new Map();

    // Create a new class name generator.
    const generateClassName = createGenerateClassName();

    const app = createApp(
      stores,
      routerContext,
      sheetsRegistry,
      generateClassName,
      theme,
      sheetsManager,
      req.url
    );

    AsyncBootstrap(app)
      .then(() => {
        if (routerContext.url) {
          res.status(302).setHeader("Location", routerContext.url);
          res.end();
          return;
        }
        const content = ReactDomServer.renderToString(app);
        const state = getStoreState(stores);
        const helmet = Helmet.rewind();

        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state),
          meta: helmet.meta.toString(),
          title: helmet.title.toString(),
          style: helmet.style.toString(),
          link: helmet.link.toString(),
          materialStyle: sheetsRegistry.toString()
        });
        res.send(html);

        reslove();
      })
      .catch(reject);
  });
};
