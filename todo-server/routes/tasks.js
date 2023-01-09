const express = require("express");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const service = require("../services/taskService");
const router = express.Router();

router.get("/query", service.query);

router.post("/create", service.create);

router.post("/update", service.update);

router.post("/delete", service.del);

module.exports = router;
