const express = require("express");
const ReactSSR = require("react-dom/server");
const fs = require("fs");
const path = require("path");
const app = express();
const serverEntry = require("../dist/server-entry").default;

var templateString = fs.readFileSync(
  path.join(__dirname, "../dist/index.html"),
  "utf8"
);

app.get("/", function(req, res) {
  const appString = ReactSSR.renderToString(serverEntry);
  const tempStr = templateString.replace("<app></app>", appString);
  res.send(tempStr);
});

app.listen(3000, function() {
  console.log(`your app is runing port on 3000`);
});
