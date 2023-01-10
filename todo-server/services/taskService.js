// todo-list api
const {
  querySql,
  queryOne,
  dateFormat,
  resolveData,
  rejectError
} = require("../utils/index");
const md5 = require("../utils/md5"); // 加密算法
const jwt = require("jsonwebtoken"); // 加密工具
const boom = require("boom");
const { body, validationResult } = require("express-validator");
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED,
  ERROR_MESSEAGE_NO_RECORD
} = require("../utils/constant");

// 处理查询结果
function handleQueryResult(data) {
  // 对于日期字段处理格式
  const dateFields = ["gmt_update"];
  const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
  for (const record of data) {
    record["gmt_create"] = dateFormat(DATE_FORMAT, record["gmt_create"]);
    record["gmt_expire"] = dateFormat(DATE_FORMAT, record["gmt_expire"]);
    record["gmt_update"] = dateFormat(DATE_FORMAT, record["gmt_update"]);
  }
  return data;
}

// 查询
function query(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    next(boom.badRequest);
  } else {
    const sql = `select * from sys_task`;
    querySql(sql)
      .then((sqlRes) => {
        if (sqlRes) {
          const handleResult = handleQueryResult(sqlRes);
          resolveData(res, {
            content: handleResult || []
          });
        }
      })
      .catch((err) => {
        rejectError(res, err);
      });
  }
}

// 新增
function create(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    next(boom.badRequest);
  } else {
    const { title, content, gmt_expire } = req.body;
    const sql = `insert into sys_task (title, content, gmt_expire) values ('${title}','${content}','${gmt_expire}')`;
    querySql(sql)
      .then((sqlRes) => {
        if (sqlRes) {
          resolveData(res, req.body);
        } else {
          // res.json({});
        }
      })
      .catch((err) => {
        rejectError(res, err);
      });
  }
}

// 修改
function update(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    next(boom.badRequest);
  } else {
    // 查询该条数据是否存在，存在则更新对应状态字段  content='${content}' gmt_expire='${gmt_expire}'
    const { id, status, title, content, gmt_expire } = req.body;
    findTask(id)
      .then((sqlOneRes) => {
        if (sqlOneRes) {
          const updateSql = `update sys_task set status='${status}', title='${title}', content='${content}', gmt_expire='${gmt_expire}' where id=${id}`;
          querySql(updateSql)
            .then((sqlRes) => {
              if (sqlRes.constructor.name !== "OkPacket") {
                rejectError(res, "修改失败");
              } else {
                resolveData(res, sqlOneRes);
              }
            })
            .catch((err) => {
              rejectError(res, err);
            });
        } else {
          rejectError(res, ERROR_MESSEAGE_NO_RECORD);
        }
      })
      .catch(function (err) {
        rejectError(res, err);
      });
  }
}

// 物理删除
function del(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    next(boom.badRequest);
  } else {
    // 查询该条数据是否存在，存在则删除数据
    const { id } = req.body;
    findTask(id).then((task) => {
      if (task) {
        const sql = `delete from sys_task where id=${id}`;
        querySql(sql).then((delRes) => {
          if (delRes) {
            if (delRes.constructor.name !== "OkPacket") {
              rejectError(res, "删除失败");
            } else {
              resolveData(res, req.body);
            }
          }
        });
      } else {
        rejectError(res, ERROR_MESSEAGE_NO_RECORD);
      }
    });
  }
}

// 查询任务
function findTask(id) {
  const taskSql = `select * from sys_task where id=${id}`;
  return queryOne(taskSql);
}

module.exports = {
  del,
  query,
  update,
  create
};
