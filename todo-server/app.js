const express = require("express"); // 引入express模块
const bodyParser = require("body-parser"); // 引入body-parser模块
const router = require("./routes"); // 导入自定义路由文件，创建模块化路由
// const cors = require("cors");
const app = express();

//  测试
// const router = express.Router();
// router.get("/user-info", (req, res) => {
//   res.json({
//     code: "200",
//     data: { content: [] }
//   });
// });
// 使用中间件
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.urlencoded({ extended: true })); // 解析form表单提交的数据 application/x-www-form-urlencoded
// app.use(cors()); // 注入cors模块解决跨域 # 或在nginx里面处理跨域
app.use("/api", router);
app.listen(8888, () => {
  console.log("服务已启动  http://localhost:8888");
});
