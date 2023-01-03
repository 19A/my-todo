// 用户信息api
const { querySql, queryOne } = require("../utils/index");
const md5 = require("../utils/md5"); // 加密算法
const jwt = require("jsonwebtoken"); // 加密工具
const boom = require("boom");
const { body, validationResult } = require("express-validator");
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED
} = require("../utils/constant");
const { decode } = require("../utils/user-jwt"); // 解密

// 登录
function login(req, res, next) {
  const err = validationResult(req);
  // 验证请求信息
  if (!err.isEmpty()) {
    // 验证失败则 统一抛错
    next(boom.badRequest("验证失败 服务端抛错"));
  } else {
    // 获取用户信息 md5加密 查询数据库中是否存在该用户，不存在则报错，存在则签发token返回前端
    let { username, password } = req.body;
    password = md5(password);
    const queryUser = `select * from sys_user where username='${username}' and password='${password}'`;
    querySql(queryUser).then((user) => {
      console.log("用户登录===", user);
      if (!user || !user.length) {
        res.json({
          code: CODE_ERROR,
          msg: "用户名或密码错误",
          data: null
        });
      } else {
        const token = jwt.sign(
          // payload：签发的 token 里面要包含的一些数据。
          { username },
          PRIVATE_KEY,
          { expiresIn: JWT_EXPIRED }
        );
        let userData = {
          id: user[0].id,
          username: user[0].username,
          nickname: user[0].nickname,
          avator: user[0].avator,
          sex: user[0].sex,
          gmt_create: user[0].gmt_create,
          gmt_modify: user[0].gmt_modify
        };
        res.json({
          code: CODE_SUCCESS,
          msg: "登录成功",
          data: {
            token,
            userData
          }
        });
      }
    });
  }
}

// 重置

// 忘记密码

module.exports = {
  login
};
