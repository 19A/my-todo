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

问题：https://github.com/babel/babel/issues/13292


问题：mobx对象更新失效？
原因：取出可观察对象重新赋值修复肯定不会生效，需要直接对最终观察属性进行修改！

问题： date.locale is not a function
原因：日期插件赋值需要dayjs处理，locale配置从antd中引入

问题：table内使用filter受控组件文字没有显示？
原因：antd 目前的默认文案是英文，但是引用了日期控件的中文包，并且在全局配置了。
解决：antd 提供了一个 React 组件 ConfigProvider 用于全局配置国际化文案

问题：axiosError: options must be an object
原因：axios版本升级导致，0.x升级为1.x，在请求参数数组序列化时出现
解决：paramsSerializer内传递一个对象，key为serialize

问题：get请求传参嵌套对象值参数失败 [Object Object]
原因：自定义序列化的方式错误
return qs.stringify(params, {: "brackets",encode: false});
注意不能query-string库不支持解析nest object，只会解析第一层，qs支持解析多层;
https://blog.csdn.net/huangpb123/article/details/84848026
解决：X

问题：
原因：
解决：查询条件、排序条件 变更后重置分页参数为默认
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
PM2: 是 Node 进程管理工具，可以利用它来简化很多 Node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。
https://www.cnblogs.com/chyingp/p/pm2-documentation.html

```

```
功能模块：
注册：
前台校验输入账密，后台校验且查库是否有存在，存在报错，
不存在则md5加密密码，数据库insert该用户数据。
插入成功则jwt签发token返给前台。
前台跳转至登录界面。

登录：
前台校验且输入账密，后台校验且查库是否存在，不存在则报错
存在则签发token返给前台。
前台缓存token且同步保存在localStorage，指定有效期。
(实现有效期内自动登录)

退出：前台清空token和localStorage内用户信息，退回至登录界面。

记住密码：


修改密码：
前台校验输入账密，后台校验且查库是否存在，不存在则报错，
存在则 update sql更改对应用户密码。

todoList增删改查：

红星标记：

查询条件筛选排序：

数据分页：

```

```
工具方法：
token的加密、解密校验、mysql配置连接 查询
业务逻辑：
用户登录注册查询等 API 接口



```

```
遇到的问题：
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

5.
现象：token失效时，再登录发现query接口还是会校验失败？！
原因：
解决：

10.数据库相关
查询数据库报错： connect ETIMEDOUT?
现象：querySql方法查询连接mySQL超时报错
解决：dbConfig内数据库密码配置错误！

现象：数据库查询密码报错：code: "ER_BAD_FIELD_ERROR"
解决：mySQL中密码和用户名中设置为字符串类型， 但是查询的sql内不为字符串！加入引号即可。

现象： ER_DUP_ENTRY: Duplicate entry 'ad1' for key 'username_UNIQUE'
原因：多次重复注册重复数据 插入重复数据时 未处理改数据库的报错抛错。
解决：后端接口包装 数据库操作报错

现象：报错为数据库连接超时?
原因：不明
解决：https://www.bbsmax.com/A/lk5aZMwPd1/’

现象：错误:调用退出后无法使查询入队.]代码:"PROTOCOL_ENQUEUE_AFTER_QUIT"
原因：已经创建的connect在end之后继续使用则会报错。
解决：每次重新查询时重新建立connect

现象： Incorrect datetime value: '2023-01-08T16:03:27.029Z' for column 'gmt_expire' at row 1
2023-01-08T16:03:27.029Z：Mon Jan 09 2023 00:03:27 GMT+0800 (中国标准时间)
2023-01-08T16:03:27.029：Sun Jan 08 2023 16:03:27 GMT+0800 (中国标准时间)
去掉Z可成功插入
原因：？？
解决：

接口504 ： Error occurred while trying to proxy: localhost:3000/api/task/query
原因：？？
解决：重启解决

问题：对于更新接口后端如何对记录进行更新，增量还是全量？

问题：code: "ERR_HTTP_HEADERS_SENT"
Cannot set headers after they are sent to the client
原因：客户端发送一次请求的时候，服务器端给出了多次响应
解决：删除异常代码逻辑

问题：数据设置默认的最后更新时间 返回前端的为2023-01-09T09:36:25.000Z？
原因：数据库设置的时间类型为 timeStamp 类型，没有处理直接返回给前端就是这种格式的
解决：后端程序需要处理为字符串再返回给前端

问题：mySQL和程序时区问题
http://www.ay1.cc/article/32521.html

问题：nodejs如何接收get post传参
解决：https://blog.csdn.net/weixin_50367873/article/details/122087714
get的传参默认存放在req.query
post的传参需要用body-parser中间件，从req.body中获取

问题：存在SQL注入风险，如何预防
解决：

问题： 1064 - You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'like '%test%'' at line 1
原因：select * from sys_task where title (status=0 or status=1) and like '%test%';
解决：sql拼写错误！！！

问题：第二页分页时返回 data:null,
原因：MySql 中 count 与 limit 混用的后果，count(*) 返回的是一条数据，limit功能是限制数据返回
解决：totalSql中去除limit条件

6.图片跨域问题 - todo


```

#### TODO

```
vscode寻找别名路径文件失败：
如何重写 antd的notification方法：

语言国际化
token鉴权： axios请求拦截器被设置token失败？完成
接口风格restful化:
物理删除变为逻辑删除:
前端排序：单字段 多字段:
后端排序:
后端分页:

```
