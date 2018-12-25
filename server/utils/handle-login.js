const router = require("express").Router();
const axios = require("axios");

const baseUrl = "https://cnodejs.org/api/v1";

router.post("/login", function(req, res, next) {
  console.log(`${baseUrl}/accesstoken`, req.body.accesstoken);
  axios
    .post(`${baseUrl}/accesstoken`, {
      accesstoken: req.body.accesstoken
    })
    .then(result => {
      if (result.status === 200 && result.data.success) {
        req.session.user = {
          accessToken: req.body.accesstoken,
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
          data: err.response.data
        });
      } else {
        // 抛出错误
        next(err);
      }
    });
});

module.exports = router;
