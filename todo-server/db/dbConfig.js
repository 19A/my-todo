const DATA_BASE_TEST = "my_test";
// const DATA_BASE_BILL = "xqq-bill";
const defaultConfig = {
  host: "1.117.165.71", // 主机名称 1.117.165.71
  port: 3308, // 端口
  user: "root", // 创建数据库设置的用户名
  password: "ZhubiaodeMysql", // 数据库密码
  database: DATA_BASE_TEST, // 连接的数据库名
  connectTimeout: 1000 //连接超时时间
};
// 连接mysql的配置文件
const getMysql = ({ ...otherConfig } = {}) => ({
  ...defaultConfig,
  ...otherConfig
});

module.exports = getMysql;
