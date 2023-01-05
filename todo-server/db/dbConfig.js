// 连接mysql的配置文件
const mysql = {
  host: "localhost", // 主机名称
  port: 3306, // 端口，默认3306
  user: "root", // 创建数据库设置的用户名
  password: "mysql", // 数据库密码
  database: "my_test", // 连接的数据库名
  connectTimeout: 4000 //连接超时时间
};
module.exports = mysql;
