// todo-list api
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

// 查询
function query(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    next(boom.badRequest);
  } else {
    const sql = `select * from sys_task`;
    querySql(sql).then((res) => {
      if (res) {
        res.json({});
      } else {
        res.json({});
      }
    });
  }
}

// 新增
// function create(req, res, next) {
//   const err = validationResult(req);
//   if (!err.isEmpty()) {
//     next(boom.badRequest);
//   } else {
//     const sql = `insert into `;
//     querySql(sql).then((res) => {
//       if (res) {
//         res.json({});
//       } else {
//         res.json({});
//       }
//     });
//   }
// }

// 删除

module.exports = {
  query
};
