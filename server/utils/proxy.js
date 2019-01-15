const axios = require('axios');
const querystring = require('query-string');

module.exports = function(req, res, next) {
  const baseUrl = '//cnodejs.org/api/v1';
  const path = req.path;
  const user = req.session.user || {};
  const needAccessToken = req.query.needAccessToken;
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login',
    });
  }
  const query = Object.assign({}, req.query, {
    accesstoken:
      needAccessToken && req.method === 'GET' ? user.accessToken : '',
  });
  const body = user
    ? Object.assign({}, req.body, {
        accesstoken: user.accessToken,
      })
    : req.body;
  if (query.needAccessToken) delete query.needAccessToken;
  let host;
  needAccessToken ? (host = 'https:') : (host = 'http:');
  console.log(
    `${host}${baseUrl}${path}`,
    querystring.stringify(query),
    query,
    body,
    req.method,
    user.accessToken
  );
  if (req.method === 'GET') {
    axios
      .get(`${host}${baseUrl}${path}?${querystring.stringify(query)}`)
      .then(result => {
        if (result.status === 200) {
          res.send(result.data);
        } else {
          res.status(result.status).send(result.data);
        }
      })
      .catch(err => {
        if (err.response.data) {
          res.send(err.response.data.error_msg);
        } else {
          res.send('unknow error');
        }
      });
  } else {
    axios
      .post(`${host}${baseUrl}${path}`, {
        params: query,
        data: JSON.stringify(
          Object.assign({}, req.body, {
            accesstoken:
              needAccessToken && req.method === 'POST' ? user.accessToken : '',
          })
        ),
        // data: Object.assign({}, req.body, {
        //   accesstoken:
        //     needAccessToken && req.method === 'POST' ? user.accessToken : '',
        // }),
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      })
      .then(result => {
        if (result.status === 200) {
          res.send(result.data);
        } else {
          res.status(result.status).send(result.data);
        }
      })
      .catch(err => {
        console.log(err.response.data);
        if (err.response.data) {
          res.send(err.response.data.error_msg);
        } else {
          res.send('unknow error');
        }
      });
  }
};
