const axios = require("axios");
const webpack = require("webpack");
const path = require("path");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactDomServer = require("react-dom/server");
const serverConfig = require("../../build/webpack.config.server");
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost/public/index.html")
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
};

const Module = module.constructor;

const mfs = new MemoryFs();
const serverComplier = webpack(serverConfig);
serverComplier.outputFileSystem = mfs;
let serverBundle;
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

  // 创建另一个模块
  const m = new Module();
  m._compile(bundle, "server-entry.js");

  serverBundle = m.exports.default;
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
      const content = ReactDomServer.renderToString(serverBundle);
      res.send(temp.replace("<!--app-->", content));
    });
  });
};
