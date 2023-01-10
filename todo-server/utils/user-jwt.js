/**
 * @author 19A
 * @since 2022-12-21 14:27:48
 * @lastTime 2022-12-21 14:40:11
 * @description jwt认证
 */

const jwt = require("jsonwebtoken"); // 生成JWT
const expressJwt = require("express-jwt"); // 解析JWT
const { PRIVATE_KEY, JWT_EXPIRED } = require("./constant"); // 引入自定义JWT密钥

// 生成token
const setToken = (payload) =>
  jwt.sign(payload, PRIVATE_KEY, { expiresIn: JWT_EXPIRED });

// expressJwt - token验证中间件
const jwtAuth = expressJwt({
  getToken,
  secret: PRIVATE_KEY,
  algorithms: ["HS256"],
  credentialsRequired: true
  // 设置jwt认证白名单，比如/api/login登录接口不需要拦截
}).unless({
  path: ["/", "/api/user/login", "/api/user/register"]
});

// 自定义token获取
function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

// // tokenVerify
// function verifyToken(req) {
//   const token = req.get("Authorization");
//   return jwt.verify(token, PRIVATE_KEY);
// }

module.exports = {
  jwtAuth,
  setToken
};
