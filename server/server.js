const express = require("express");
const ReactSSR = require("react-dom/server");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const favicon = require("serve-favicon");

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
  const serverEntry = require("../dist/server-entry").default;
  var templateString = fs.readFileSync(
    path.join(__dirname, "../dist/index.html"),
    "utf8"
  );
  app.use("*", express.static(path.join(__dirname, "../dist")));
  app.get("/", function(req, res) {
    const appString = ReactSSR.renderToString(serverEntry);
    const tempStr = templateString.replace("<!--app-->", appString);
    res.send(tempStr);
  });
} else {
  const devStatic = require("./utils/dev-static.js");
  devStatic(app);
}

app.listen(3000, function() {
  console.log(`your app is runing on 3000`);
});
