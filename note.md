## todo-client

```
文件结构：...
技术栈：
使用 react, react-router, mobx，antd v5，craco，axios, less
使用 craco 去覆盖cli内部webpack配置，不用 rewired暴露 webpack
使用 mobx 管理数据状态
```

### 问题记录

```
craco 配置问题:
支持less：参考解决 https://juejin.cn/post/7049309953898577957

```

#### TODO

```
vscode寻找别名路径文件失败：
如何重写 antd的notification方法：

```

## todo-server

```
文件结构
│  app.js                             // 入口文件
│  ecosystem.config.js                // pm2默认配置文件
│  package.json                       // npm包管理所需模块及配置信息
├─db
│      dbConfig.js                    // mysql数据库基础配置
├─routes
│      index.js                       // 初始化路由信息，自定义全局异常处理
│      tasks.js                       // 任务路由模块
│      users.js                       // 用户路由模块
├─services
│      taskService.js                 // 业务逻辑处理 - 任务相关接口
│      userService.js                 // 业务逻辑处理 - 用户相关接口
└─utils
        constant.js                   // 自定义常量
        index.js                      // 封装连接mysql模块
        md5.js                        // 后端封装md5方法
        user-jwt.js                   // jwt-token验证和解析函数
```

```
技术栈：nodejs-v14 mysql-5.7 express-v4 nodemon crypto boom pm2
MySQL：Node.js 连接 MySQL 数据库
cors：实现 Node 服务端跨域的 JS 库。
nodemon:使用nodemon实现热更新，无需每次修改手动重启服务。
express-validator：一个基于 Express 的数据验证中间件，可以方便的判断传入的表单数据是否合法
body-parser：对 post 请求的请求体进行解析的 express 中间件。
boom：处理程序异常状态，boom 是一个兼容 HTTP 的错误对象，他提供了一些标准的 HTTP 错误，比如 400(参数错误)等。
jsonwebtoken：基于jwt的概念实现安全的加密方案库，实现加密 token 和解析 token 的功能。
express-jwt：express-jwt 是在 jsonwebtoken 的基础上做了上层封装，基于 Express 框架下认证 jwt 的中间件，来实现 jwt 的认证功能。
```

```
功能模块：
登录(退出)
注册
记住密码
修改密码
todoList增删改查
红星标记
查询条件筛选
```

```
工具方法：
token的加密、解密校验、mysql配置连接 查询
业务逻辑：
用户登录注册查询等 API 接口



```

```
1.expressJwt is not a function
现象: 7.x.x版本引入方式为 const expressJwt = require('express-jwt')则出现此报错;原因版本问题
解决：使用6.x.x版本 修改引入方式为  const {expressJwt} = require('express-jwt');


2.Router.use() requires a middleware function but got a ' + gettype(fn)
现象：使用router.use('api', xxxRoute); 其中xxxRouter未从对应文件中暴露;
解决：module.exports = xxxRoute;


3.remote target看不到 本地已经有开启inspect的nodejs程序?
现象：使用命令 node app.js --inspect;
解决：官网正确命令 node --inspect app.js;

4.客户端请求服务器需要代理。衍生的跨域问题同样需要服务端处理(暂时为前端配置代理端口处理)

5.数据库相关
查询数据库报错： connect ETIMEDOUT?
现象：querySql方法查询连接mySQL超时报错
解决：dbConfig内数据库密码配置错误！！！

现象：数据库查询密码报错：code: "ER_BAD_FIELD_ERROR"
解决：mySQL中密码和用户名中设置为字符串类型， 但是查询的sql内不为字符串！加入引号即可。

```
