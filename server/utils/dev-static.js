const axios = require("axios");
const webpack = require("webpack");
const path = require("path");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactDomServer = require("react-dom/server");
const serverConfig = require("../../build/webpack.config.server");
const AsyncBootstrap = require("react-async-bootstrapper").default;
const ejs = require("ejs");
const serialize = require("serialize-javascript");

const getTemplate = () => {
  return new Promise(resolve => {
    axios
      .get("http://localhost:8888/public/server.ejs")
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.error("get template error", err);
      });
  });
};

const NativeModule = require("module");
const vm = require("vm");

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} };
  const wrapper = NativeModule.wrap(bundle);
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m
};

const mfs = new MemoryFs();
const serverComplier = webpack(serverConfig);
serverComplier.outputFileSystem = mfs;
let serverBundle, createStoreMap;
// 使用webpack把编译后的内容存入内存中
serverComplier.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.log(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );

  const bundle = mfs.readFileSync(bundlePath, "utf-8");
  // 创建一个模块
  const m = getModuleFromString(bundle, "server-entry.js");
  serverBundle = m.exports.default;
  createStoreMap = m.exports.createStoreMap;
});

// 服务端渲染更新数据默认值
const getStoreState = stores => {
  return Object.keys(stores).reduce((result, stroeName) => {
    result[stroeName] = stores[stroeName].toJson();
    return result;
  }, {});
};

module.exports = app => {
  app.use(
    "/public",
    proxy({
      target: "http://127.0.0.1:8888"
    })
  );
  app.get("*", function(req, res) {
    getTemplate().then(template => {
      const routerContext = {};
      const stores = createStoreMap();
      const app = serverBundle(stores, routerContext, req.url);

      AsyncBootstrap(app).then(() => {
        if (routerContext.url) {
          res.status(302).setHeader("Location", routerContext.url);
          res.end();
          return;
        }
        const content = ReactDomServer.renderToString(app);
        const state = getStoreState(stores);
        // res.send(template.replace("<!-- app -->", content));
        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state)
        });
        res.send(html);
      });
    });
  });
};
