const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const favicon = require("serve-favicon");
const serverRender = require("./utils/server-render");

app.use(favicon(path.join(__dirname, "../favicon.ico")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    maxAge: 10 * 60 * 1000,
    resave: false,
    name: "tid",
    saveUninitialized: false,
    secret: "stone"
  })
);

app.use("/api/user", require("./utils/handle-login"));
app.use("/api", require("./utils/proxy"));

const idDev = process.env.NODE_ENV === "development";
if (!idDev) {
  const serverEntry = require("../dist/server-entry");
  var template = fs.readFileSync(
    path.join(__dirname, "../dist/server.ejs"),
    "utf-8"
  );
  app.use("/public", express.static(path.join(__dirname, "../dist")));
  app.get("*", function(req, res, next) {
    serverRender(serverEntry, template, req, res).catch(next);
  });
} else {
  const devStatic = require("./utils/dev-static.js");
  devStatic(app);
}

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send(err);
});

app.listen(3000, function() {
  console.log(`your server is runing on 3000`);
});
