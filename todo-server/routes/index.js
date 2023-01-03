const express = require("express");
const boom = require("boom"); // 引入boom模块，处理程序异常
const userRoute = require("./users"); // 引入users路由模块
const tasksRoute = require("./tasks"); // 引入tasks路由模块
const { jwtAuth, decode } = require("../utils/user-jwt");

const router = express.Router();
router.use("/user", userRoute); // 注入user路由模块;
router.use("/task", tasksRoute); // 注入task路由模块;

// 自定义统一异常处理中间件，需要放在代码最后
const handleError = function (err, req, res, next) {
  console.log("err", err, req, res, next);
  // 自定义用户认证失败的错误返回
  console.log("err===", err);
  if (err && err.name === "UnauthorizedError") {
    const { status = 401, message } = err;
    // 抛出401异常
    res.status(status).json({
      code: status,
      msg: "token失效,请重新登录",
      data: null
    });
  } else {
    const { output } = err || {};
    // 错误码和错误信息
    const errCode = (output && output.statusCode) || 500;
    const errMsg =
      (output && output.payload && output.payload.error) || err.message;
    res.status(errCode).json({
      code: errCode,
      msg: errMsg
    });
  }
};
// 注册中间件
router.use(handleError);

module.exports = router;
