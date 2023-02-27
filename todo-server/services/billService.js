// todo-list api
const {
  queryBillSql,
  queryBillOne,
  dateFormat,
  resolveData,
  rejectError
} = require("../utils/index");
const Util = require("util");
const md5 = require("../utils/md5"); // 加密算法
const jwt = require("jsonwebtoken"); // 加密工具
const boom = require("boom");
const { validationResult } = require("express-validator");

// 查询
function query(req, res, next) {
  const err = validationResult(req);
  debugger;
  if (!err.isEmpty()) {
    next(boom.badRequest);
  } else {
    //处理查询参数
    const {
      query: { status, sorter, title, page: _page = 0, size: _size = 10 }
    } = req;
    const page = Number(_page);
    const size = Number(_size);
    // const [sortField = "gmt_update", order = "desc"] =
    //   (sorter && sorter.split(",")) || [];
    // // 对于查询的不同字段处理拼接
    let sql = `select * from lp_bill `;
    // if (status) {
    //   let statusSql = (status || []).reduce((pre, cur, idx, arr) => {
    //     const isLast = idx === arr.length - 1;
    //     let add = isLast ? ` status=${cur}` : ` status=${cur} or`;
    //     return pre + add;
    //   }, "where");
    //   sql += statusSql;
    // }
    // if (title) {
    //   let _titleSql = ` title like '%${title}%'`;
    //   let titleSql = sql.includes("where") ? _titleSql : " where " + _titleSql;
    //   sql += titleSql;
    // }
    // if (sortField && order) {
    //   let sorterSql = ` order by ${sortField} ${order}`;
    //   sql += sorterSql;
    // }
    // // 根据 page, size 分页 select * from table limit (page_num-1)*page_size,page_size;
    // if (page && size) {
    //   let pageSql = ` limit ${(page - 1) * size}, ${size}`;
    //   sql += pageSql;
    // }
    // // count(*) 需要去除limit字段
    const total = sql.replace("*", "count(*)");
    const limit = total.match(/(.+(?=limit))/);
    const totalSql = limit ? limit[0] : total;
    // debugger;
    Promise.all([queryBillSql(sql), queryBillSql(totalSql)])
      .then(([sqlRes, totalRes]) => {
        if (sqlRes) {
          const totalElements = totalRes[0]["count(*)"];
          const totalPages = size ? Math.ceil(totalElements / size) : null;
          //   const content = handleQueryResult(sqlRes) || [];
          const content = sqlRes || [];
          resolveData(res, {
            size,
            page,
            content,
            totalPages,
            totalElements
          });
        }
      })
      .catch((err) => {
        console.log("-----------------err-------------------", res, err);
        rejectError(res, err);
      });
  }
}

// // 处理查询结果
// function handleQueryResult(data) {
//   // 对于日期字段处理格式
//   const dateFields = ["gmt_update"];
//   const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
//   for (const record of data) {
//     record["gmt_create"] = dateFormat(DATE_FORMAT, record["gmt_create"]);
//     record["gmt_expire"] = dateFormat(DATE_FORMAT, record["gmt_expire"]);
//     record["gmt_update"] = dateFormat(DATE_FORMAT, record["gmt_update"]);
//   }
//   return data;
// }

module.exports = {
  query
};
