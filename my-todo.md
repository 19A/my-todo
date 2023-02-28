## todo-client

### 简介

```
是一个学习的demo项目，用react, express实现登录注册和任务的增删改查，可以使用docker-compose部署
```

### 结构

```
|─assets                // 静态资源、样式
|─components            // 通用组件
│─pages                 // 页面
|       Login
|       ...
│─routers               // 路由文件
|       index.js
│─services               // 请求Api
|       index.js
│─store
|       index.js        // mobx存放数据
│─utils
|  index.js
|  constants
|  network.js           // axios请求拦截封装
|
│  package.json         // npm包管理所需模块及配置信息
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
解决：

```

## todo-server

### 结构

```
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
vscode寻找别名路径文件失败
语言国际化
token鉴权： axios请求拦截器被设置token失败？完成
接口风格restful化:
物理删除修正为逻辑删除:
```

## docker 部署

### 单独部署

#### 部署 web

```
1.拉取镜像
 docker pull nginx
2.创建挂载目录
mkdir -p /data/nginx/{nginx.conf,conf.d,html,logs}
(文件内容保持和 nginx 容器中映射目录内容一致即可) 3.启动容器
docker run --name myNginx -d -p 8889:80 --restart=always
-v /data/nginx/html:/usr/share/nginx/html
-v /data/nginx/nginx.conf:/etc/nginx/nginx.conf
-v /data/nginx/conf.d:/etc/nginx/conf.d
 -v /data/nginx/logs:/var/log/nginx nginx

需要修改 nginx 配置则修改 nginx 配置文件 default.conf
```

#### 部署 node

1.在项目根目录新建 Dockerfile
vim Doockerfile

```
FROM node

WORKDIR /node
COPY . /node

RUN yarn config set registry "https://registry.npm.taobao.org/"

RUN yarn

EXPOSE 3000 8888

CMD yarn start

```

2.构建本地镜像
docker build -t node .
docker images 3.启动容器
docker run -d --restart=always --name my-node --restart='always' -p 3000:8888 my-node

#### 部署 mysql

```
1.拉取镜像
docker pull mysql
2.创建挂载目录
mkdir -p /data/mysql/data /data/mysql/logs /data/mysql/conf
3.启动容器
docker run --restart=always -p 3306:3306 --name mysql -v /data/mysql/conf:/etc/mysql/conf.d -v /data/mysql/logs:/var/log/mysql -v /data/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql -d mysql
4.进入mysql容器
docker exec -it mysql /bin/bash
5.进入mysql
mysql -u root -p;
6.进行mysql操作
-- 创建数据库
CREATE DATABASE `my_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
-- 创建用户表
CREATE TABLE `sys_user` (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
    `username` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '登录帐号，邮箱或手机号',
    `password` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '登录密码',
    `nickname` VARCHAR(50) NULL DEFAULT '' COMMENT '昵称',
    `avator` VARCHAR(50) NULL DEFAULT '' COMMENT '用户头像',
`sex` VARCHAR(20) NULL DEFAULT '' COMMENT '性别：u:未知,  m:男,  w:女',
`gmt_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`gmt_modify` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`) USING BTREE,
	  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='用户表';
-- 创建任务表
CREATE TABLE `sys_task` (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
    `title` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '任务名称',
    `content` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '任务内容',
`is_major` TINYINT(1) NULL DEFAULT 0 COMMENT '是否收藏1|0',
`status` TINYINT(2) NULL DEFAULT 0 COMMENT '单据状态 0:待办 1: 完成2:删除 999:全部',
`gmt_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`gmt_expire` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '截止时间',
`gmt_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
    PRIMARY KEY (`id`) USING BTREE,
	  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='任务表';

```

#### 打包部署问题

```
1.node部署后启动成功   但是 访问curl:localhost:8000
报错 curl: (7) Failed connect to localhost:8888; Connection refused
原因：node在容器内启动端口为8888 , dockerFile文件内暴露为3000 ，容器启动的映射为 3000:3000
解决：必须暴露启动端口 8888

2.web访问端口需要代理问题
curl:localhost:8888成功后  从http://1.117.165.71:8889/访问端口 404nginx
原因：端口不一致， 需要nginx进行端口代理
解决：注意代理地址时先在nginx上确认是否可以访问到代理的地址

3.跨域问题
解决一：代码内使用cors插件处理
解决二：nginx配置内添加 允许跨域配置。


5.前端路由失效 和 界面刷新404问题
原因：history模式下的浏览器的路由是真实的资源访问地址，在访问前端路由时应确保返回index.html的内容
解决刷新页面404
nginx/conf.d/default.conf内添加
try_files $uri $uri/ /index.html;
https://juejin.cn/post/7036569799140311077
解决路由失效
解决一：更为hash模式 模式通用性好，不依赖服务器的配置，省心省力，但是缺点是不够优雅
解决二：https://www.cnblogs.com/imgss/p/11703422.html

6.前端静态资源访问失败
原因：
解决：

7.进入node容器内, curl not found
原因：Dockerfile文件内指定的node版本没有curl
解决：指定最新的node镜像

8.报错
unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /data/node/Dockerfile: no such file or directory
原因：DockerFile应该拼写为Dockerfile

9.node一直连接不上mysql
报错：Client does not support authentication protocol requested by server;
原因：docker使用的最新的mysql，不支持旧的密码认证模式
解决：降为和本地一致 5.7 版本的就行了。
```

10.2023/02/24
tmd 的服务器数据库被网络黑子删了。。。
只能重新导入本地 sql 文件，发现 node 数据库连接不上 mysql：发现有报错
Access denied for user 'root'@'node-container.data_data_security' (using password: YES)
解决：node 更改文件后，未重新构建镜像！

11.node 镜像启动成功, 连接数据库报错:
UnhandledPromiseRejectionWarning: Error: getaddrinfo ENOTFOUND mysql
at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:69:26)
原因：不明 ！
临时解决：将 dbConfig 的 host 由 mysql 变更为 固定 ip 重启后解决。推测为 docker 的容器内 host 映射失败

#### 其他问题

```
如何用谷歌浏览器的开发者工具模拟低版本浏览器?
无法解决！

```

### docker-compose 部署

准备：下载 docker 和 docker-compose;

1.前端使用 nginx

2.后端代码 docker 打包成镜像

```
# 镜像版本
FROM node:14.17

# 镜像作者
LABEL maintainer="19A"

# 工作目录
WORKDIR /todo/server

# 制文件到容器里指定路径
COPY . /todo/server

# 环境变量
ENV NODE_ENV=production

# 设置依赖下载地址
RUN yarn config set registry "https://registry.npm.taobao.org/"

# 拉取依赖
RUN yarn

# 暴露端口
EXPOSE 3000 8888

# 启动
CMD yarn start
# 注：RUN 是在 docker build , CMD 在docker run 时运行。

```

3.配置 docker-compose.yml

```
version: '3.1'
services:
  todo-client:
    image:  nginx:latest #镜像命名
    container_name: nginx-container
    restart: always
    ports:
      - "8889:80"
    networks:
      data_security:
        ipv4_address: 192.128.0.8
    privileged: true      # 这个必须要，解决nginx的文件调用的权限问题
    volumes:
      - ./data/nginx/html:/usr/share/nginx/html           # 前端打包文件
      - ./data/nginx/nginx.conf:/etc/nginx/nginx.conf     # nginx配置文件
      - ./data/nginx/conf.d:/etc/nginx/conf.d
      - ./data/nginx/logs:/var/log/nginx nginx            # nginx日志
  node:
    build: '.'  # 表示以当前目录下的Dockerfile开始构d建镜像
    image: todo/node-image #从当前目录下todo-client子目录内找Dockerfile生成image
    container_name: node-container
    ports:
      - "3000:8888"
    restart: always
    environment:
      TZ: Asia/Shanghai # 指定时区
    networks:
      data_security:
        ipv4_address: 192.128.0.4
  mysql:
    restart: always # docker启动时 容器自动重启
    image: mysql:5.7.30 # 指定镜像路径
    container_name: mysql-container # 容器名称
    environment:
      - TZ=Asia/Shanghai                        # 指定时区
      - MYSQL_ROOT_PASSWORD=mysql               #数据库初始话为root用户设置的默认密码
      - MYSQL_DATABASE=my_test						      # 项目数据库名
    ports:
      - "3306:3306" # 指定端口号映射
    volumes:
      - ./root/mysql/conf:/etc/mysql/conf.d # 映射数据卷
      - ./root/mysql/logs:/var/log/mysql
      - ./root/mysql/data:/var/lib/mysql

    networks:
      data_security:
        ipv4_address: 192.128.0.2
    command: --default-authentication-plugin=mysql_native_password --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --sql-mode='' --max-execution-time=1000

networks:
  data_security:      # 自定义网络名字
    driver: bridge
    ipam:
      config:
        - subnet: 192.128.0.0/16           #自定义固定容器ip 实现容器间通讯，增强docker-compose项目可移植性

```

4.相关命令
docker-compose up
docker-compose down
