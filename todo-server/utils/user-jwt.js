/**
 * @author 19A
 * @since 2022-12-21 14:27:48
 * @lastTime 2022-12-21 14:40:11
 * @description jwt认证
 */

const jwt = require("jsonwebtoken"); // 生成JWT
const expressJwt = require("express-jwt"); // 解析JWT
const { PRIVATE_KEY } = require("./constant"); // 引入自定义JWT密钥

// 验证token
const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true,
  //   getToken: function fromHeaderOrQuerystring(req) {
  //     if (
  //       req.headers.authorization &&
  //       req.headers.authorization.split(" ")[0] === "Bearer"
  //     ) {
  //       return req.headers.authorization.split(" ")[1];
  //     } else if (req.query && req.query.token) {
  //       return req.query.token;
  //     }
  //     return null;
  //   }
  getToken: (req) => {
    if (req.headers.authorization) {
      debugger;
      return req.headers.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
  }
  // 设置jwt认证白名单，比如/api/login登录接口不需要拦截
}).unless({
  path: ["/", "/api/login", "/api/register", "api/resetPwd"]
});

// jwt-token解密
function decode(req) {
  const token = req.get("Authorization");
  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
  jwtAuth,
  decode
};
