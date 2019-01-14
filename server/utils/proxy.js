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
  if (query.needAccessToken) delete query.needAccessToken;
  let host;
  needAccessToken ? (host = 'https:') : (host = 'http:');
  console.log(`${host}${baseUrl}${path}`, querystring.stringify(query), req.query, req.body, req.method, user.accessToken);
  axios
    .post(`${host}${baseUrl}${path}`, {
      method: req.method,
      params: querystring.stringify(query),
      data: querystring.stringify(
        Object.assign({}, req.body, {
          accesstoken:
            needAccessToken && req.method === 'POST' ? user.accessToken : '',
        })
      ),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
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
      if (err.response) {
        res.status(500).send(err.response.data);
      } else {
        res.status(500).send({
          success: false,
          msg: 'unknow error',
        });
      }
    });
};
