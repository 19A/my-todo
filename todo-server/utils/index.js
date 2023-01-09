const mysql = require("mysql");
const config = require("../db/dbConfig");

// 用于保存数据连接实例
// var db = null;
function connect() {
  return mysql.createConnection(config);
}

var pingInterval;

// 如果数据连接出错，则重新连接
// function handleError(err) {
//   console.info(err.stack || err);
//   connect();
// }

// 建立数据库连接 ps:pm2配置node环境下，超过8小时mysql自动关闭的情况下出现的解决方法
// function connect() {
//   if (db !== null) {
//     db.destroy();
//     db = null;
//   }
//   db = mysql.createConnection(config);
//   db.connect(function (err) {
//     if (err) {
//       console.info(
//         "error when connecting to db,reConnecting after 2 seconds:",
//         err
//       );
//       setTimeout(connect, 2000);
//     }
//   });
//   db.on("error", handleError);
//   // 每个小时ping一次数据库，保持数据库连接状态
//   clearInterval(pingInterval);
//   pingInterval = setInterval(() => {
//     console.log("ping...");
//     db.ping((err) => {
//       if (err) {
//         console.log("ping error: " + JSON.stringify(err));
//       }
//     });
//   }, 3600000);
// }

// connect();

//新建查询连接
function querySql(sql) {
  var db = connect();
  console.log("db", db);
  return new Promise((resolve, reject) => {
    // 此处sql可为 query 【查询数据】update【执行结果】delete【执行结果】
    try {
      db.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    } catch (error) {
      reject(error);
    } finally {
      db.end();
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
