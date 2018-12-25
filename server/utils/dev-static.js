const axios = require("axios");
const webpack = require("webpack");
const path = require("path");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactDomServer = require("react-dom/server");
const serverConfig = require("../../build/webpack.config.server");
const AsyncBootstrap = require("react-async-bootstrapper");

const getTemplate = () => {
  return new Promise(resolve => {
    axios
      .get("http://localhost:8888/public/index.html")
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.error("get template error", err);
      });
  });
};

const Module = module.constructor;

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
  // hack 创建一个模块
  const m = new Module();
  m._compile(bundle, "server-entry.js");
  serverBundle = m.exports.default;
  createStoreMap = m.exports.createStoreMap;
});

module.exports = app => {
  app.use(
    "/public",
    proxy({
      target: "http://127.0.0.1:8888"
    })
  );
  app.get("*", function(req, res) {
    getTemplate().then(temp => {
      const routerContext = {};
      const app = serverBundle(createStoreMap(), routerContext, req.url);

      AsyncBootstrap(app).then(() => {
        const content = ReactDomServer.renderToString(app);
        if (routerContext.url) {
          res.status(302).setHeader("Location", routerContext.url);
          res.end();
          return;
        }
        res.send(temp.replace("<!-- app -->", content));
      });
    });
  });
};
