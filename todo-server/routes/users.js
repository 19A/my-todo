/**
 * @since 2022-12-21 14:29:24
 * @lastTime 2022-12-21 17:28:35
 * @description 用户路由模块
 */

const express = require("express");
const { body, validationResult } = require("express-validator");
const service = require("../services/userService");
const router = express.Router();

// 登录/注册校验
const vaildator = [
  body("username").isString().withMessage("用户名类型错误"),
  body("password").isString().withMessage("密码类型错误")
];

// 用户登录路由
router.post(
  "/login",
  //   (a, b, c, d) => {
  //     console.log("/login--post", a, b, c, d);
  //     return () => {};
  //   },
  vaildator,
  service.login
);

module.exports = router;
