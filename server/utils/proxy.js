const axios = require("axios");
const querystring = require("query-string");

module.exports = function(req, res, next) {
  const baseUrl = "http://cnodejs.org/api/v1";
  const path = req.path;
  const user = req.session.user || {};
  const needAccessToken = req.query.needAccessToken;
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: "need login"
    });
  }
  const query = Object.assign({}, req.query, {
    accesstoken: needAccessToken && req.method === "GET" ? user.accessToken : ""
  });
  if (query.needAccessToken) delete query.needAccessToken;
  console.log(query)
  axios
    .post(`${baseUrl}${path}`, {
      method: req.method,
      params: query,
      data: querystring.stringify(
        Object.assign({}, req.body, {
          accesstoken:
            needAccessToken && req.method === "POST" ? user.accessToken : ""
        })
      ),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(result => {
      if (result.status === 200) {
        res.send(result.data);
      } else {
        res.status(result.status).send(result.data);
      }
    })
    .catch(err => {
      if (err.response) {
        res.status(500).send(err.response.data);
      } else {
        res.status(500).send({
          success: false,
          msg: "unknow error"
        });
      }
    });
};
