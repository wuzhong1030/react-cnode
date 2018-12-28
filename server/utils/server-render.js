const serialize = require("serialize-javascript");
const ejs = require("ejs");
const Helmet = require("react-helmet").default;
const AsyncBootstrap = require("react-async-bootstrapper").default;
const ReactDomServer = require("react-dom/server");

const SheetsRegistry = require("react-jss").SheetsRegistry;
const create = require("jss").create;
const preset = require("jss-preset-default").default;
const createMuiTheme = require("material-ui/styles").createMuiTheme;
const createGenerateClassName = require("material-ui/styles/createGenerateClassName")
  .default;
const { pink, lightBlue } = require("material-ui/colors");

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
    const jss = create(preset())
    jss.options.createGenerateClassName = createGenerateClassName
    const app = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url);

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
