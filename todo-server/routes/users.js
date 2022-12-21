/**
 * @since 2022-12-21 14:29:24
 * @lastTime 2022-12-21 17:28:35
 * @description 用户路由模块
 */

const express = require("express");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const service = require("../services/userService");
const router = express.Router();
