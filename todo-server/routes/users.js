/**
 * @since 2022-12-21 14:29:24
 * @lastTime 2022-12-21 17:28:35
 * @description 用户路由模块
 */

const express = require("express");
const { body, validationResult } = require("express-validator");
const service = require("../services/userService");
const router = express.Router();

// 登录校验
const vaildatorForLogin = [
  body("username").isString().withMessage("用户名类型错误"),
  body("password").isString().withMessage("密码类型错误")
];

// 注册校验
const validatorForRegister = [
  body("username").isString().withMessage("用户名类型错误"),
  body("oldPwd").isString().withMessage("旧密码类型错误"),
  body("newPwd").isString().withMessage("新密码类型错误")
];

// ----路由------
// 用户登录
router.post("/login", vaildatorForLogin, service.login);
// 用户注册
router.post("/register", validatorForRegister, service.register);
// 修改密码
router.post("/modify-pwd", validatorForRegister, service.modifyPwd);

module.exports = router;
