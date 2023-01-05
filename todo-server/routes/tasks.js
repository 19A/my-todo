const express = require("express");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const service = require("../services/taskService");
const router = express.Router();

router.get("/query", service.query);

module.exports = router;
