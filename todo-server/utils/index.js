const mysql = require("mysql");
const config = require("../db/dbConfig");
// 创建mysql连接实例
function connectCreate() {
  return mysql.createConnection({ ...config });
}

//新建查询连接
function querySql(sql) {
  const conc = connectCreate();
  conc.connect();
  return new Promise((resolve, reject) => {
    try {
      conc.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    } catch (error) {
      reject(error);
    } finally {
      conc.end();
    }
  });
}

// 查询一条语句
function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql)
      .then((res) => {
        console.log("res=====", res);
        // resolve(res);
        if (res && res.length > 0) {
          resolve(res[0]);
        } else {
          resolve(null);
        }
      })
      .catch((err) => reject(err));
  });
}

module.exports = {
  querySql,
  queryOne
};
