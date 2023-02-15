### 基本类型
```
// 参考：https://www.runoob.com/mysql/mysql-data-types.html
// MySQL 中定义数据字段的类型对你数据库的优化是非常重要的。
// MySQL 支持多种类型，大致可以分为三类：数值、日期/时间和字符串(字符)类型。
// 1. 数值类型
// 整数类型：BIT、BOOL、TINY INT、SMALL INT、MEDIUM INT、 INT、 BIG INT
// 浮点数类型：FLOAT、DOUBLE、DECIMAL
// 2. 日期和时间类型
// 1Date、DateTime、TimeStamp、Time、YearDATE    TIME    YEAR  DATETIME  ...
// 3. 字符串类型
// CHAR、VARCHAR、TINY TEXT、TEXT、MEDIUM TEXT、LONGTEXT、TINY BLOB、BLOB、MEDIUM BLOB、LONG BLOB

// 其他数据类型：BINARY、VARBINARY、ENUM、SET、Geometry、Point、MultiPoint、LineString、MultiLineString、Polygon、GeometryCollection等
```

### 库操作
```
```
### 表操作
```
表操作
建表语句：CREATE TABLE table_name (column_name column_type);
demo: create table user_table1(
   -> user_id INT NOT NULL AUTO_INCREMENT,
   -> PRIMARY KEY(user_id)
   -> )ENGINE=InnoDB DEFAULT charset=utf8;
bug: create table user_table_2(user_id INT UNSIGNED AUTO_INCREMENT, PRIMARY_KEY(user_id))ENGINE=innoDB default charset=utf8;
note: UNSIGNED 和 AUTO_INCREMENT 连用 表示从0开始自增

/* 删表语句：drop table table_name */
// 其他操作：复制 修改表名 删除表字段  修改字段
// 修改表名： ALTER TABLE testalter_tbl RENAME TO alter_tbl;
```
### 字段操作
```
// column 操作
// 插入列: ALTER TABLE 表名 ADD 新字段名 数据类型[约束条件];
/* alter table table_name 
                add column field1,
                add column fieldN
                    after field / first;
*/
// show columns from alter_tbl; [简写  desc table_name]
// ALTER TABLE testalter_tbl ADD i INT;
// ALTER TABLE testalter_tbl drop i;
// ALTER TABLE testalter_tbl MODIFY c CHAR(10);
// ALTER TABLE testalter_tbl CHANGE i j BIGINT;
/* ALTER TABLE 对 Null 值和默认值的影响 */
// ...   NOT NULL DEFAULT 100;
// 字段默认值操作：
// 修改：ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
// 删除：ALTER TABLE testalter_tbl ALTER i DROP DEFAULT;
```
### 记录操作
```
// record 操作
/* 查询语句: SELECT column_name,column_name FROM table_name [WHERE Clause] [LIMIT N][ OFFSET M]  */
// demo2:select * from user_table where user_id=24;
/* LIKE查询子句：SELECT field1, field2,...fieldN  FROM table_name WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue' */
// demo: SELECT * from runoob_tbl  WHERE runoob_author LIKE '%COM';
// MySQL 的 WHERE 子句的字符串比较是不区分大小写的。 你可以使用 BINARY 关键字来设定 WHERE 子句的字符串比较是区分大小写的。

```
### 查询
```
UNION查询：
SELECT 列名称 FROM 表名称 UNION SELECT 列名称 FROM 表名称 ORDER BY 列名称；
SELECT 列名称 FROM 表名称 UNION ALL SELECT 列名称 FROM 表名称 ORDER BY 列名称；
UNION 语句：用于将不同表中相同列中查询的数据展示出来；（不包括重复数据）
UNION ALL 语句：用于将不同表中相同列中查询的数据展示出来；（包括重复数据） */

// MySQL 排序
// SELECT field1, field2,...fieldN FROM table_name1, table_name2...
// ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]
// demo: SELECT country FROM Websites UNION SELECT country FROM apps  ORDER BY country;
/*  GROUP BY 语句:
 SELECT column_name, function(column_name) FROM table_name WHERE column_name operator value GROUP BY column_name;
 使用 WITH ROLLUP
 SELECT name, SUM(signin) as signin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;
 select coalesce(name,'总数') as '姓名', SUM(signin) as '登录次数' from employee group by name with rollup;
*/

// 联表查询
// INNER JOIN
// SELECT * FROM runoob_tbl a INNER JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;
// LEFT JOIN
// RIGHT JOIN
// 左连接where只影向右表，右连接where只影响左表。 左连接后的检索结果是显示tbl1的所有数据和tbl2中满足where 条件的数据。
//  简言之 Left Join影响到的是右边的表 检索结果是tbl2的所有数据和tbl1中满足where 条件的数据。 简言之 Right Join影响到的是左边的表。
// note: where的隐性连接已经逐步淘汰，多使用 on 显性连接为主。

// NULL 值处理
```

### 增删改
```
// 数据操作
// MySQL ALTER命令
/* 插入数据:INSERT INTO table_name ( field1, field2,...fieldN )VALUES ( value1, value2,...valueN ); */
/* 更新数据:UPDATE table_name SET field1=new-value1, field2=new-value2  */
/* 删除数据:DELETE from table_name [WHERE Clause]*/
```

### 索引
// MySQL 索引:  索引可以大大提高MySQL的检索速度
// 索引分单列索引和组合索引
// 单列索引，即一个索引只包含单个列，一个表可以有多个单列索引，但这不是组合索引。组合索引，即一个索引包含多个列。
// 提高了查询速度，同时却会降低更新表的速度
// 索引创建
// CREATE INDEX indexName ON table_name (column_name) |
//  ALTER table tableName ADD INDEX indexName(columnName) |
//  CREATE TABLE mytable(
//     ID INT NOT NULL,
//     username VARCHAR(16) NOT NULL,
//     INDEX [indexName] (username(length))
//     );
// 索引删除 DROP INDEX [indexName] ON mytable;
// 唯一索引：索引列的值必须唯一，但允许有空值。如果是组合索引，则列值的组合必须唯一。
// CREATE UNIQUE INDEX indexName ON mytable(username(length))


### 导入导出
// MySQL 导出数据 SELECT ... INTO OUTFILE
// 报错：The MySQL server is running with the --secure-file-priv option so it cannot
// 原因：是mysql设置的权限, 默认只能 导出到 secure-file-priv[安全文件保护] 设定的文件路径。
// 解决：使用默认路径或者修改默认导出路径：使用 show variables like '%secure%';

// MySQL 导入数据
// 1.mysql命令导入：mysql -u用户名    -p密码    <  要导入的数据库数据(runoob.sql)
// 2.source命令导入：source /home/abc/abc.sql  # 导入备份数据库
### 其他
// MySQL 临时表! create temporary table table_name (field_name field_type) values (field_value);
// MySQL 序列使用
// MySQL 处理重复数据


