const router = require("express").Router();
const axios = require("axios");

const baseUrl = "http://cnodejs.org/api/v1";

router.post("/login", function(req, res, next) {
  axios
    .post(`${baseUrl}/accesstoken`, {
      accesstoken: res.body.accessToken
    })
    .then(result => {
      if (result.status === 200 && result.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: result.data.loginname,
          id: result.data.id,
          avatar: result.data.avatar_url
        };
        res.json({
          success: true,
          data: result.data
        });
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response
        });
      } else {
        // 抛出错误
        next(err);
      }
    });
});

module.exports = router;
