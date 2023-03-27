1. `npm install`下载的包默认添加什么依赖。开发 or 生产？生产
2. 了解如何控制代码的兼容性
   安装 `babel` 相关依赖
   `npm i -D @babel/core @babel/cli @babel/preset-env`
   直接`npm run compile`和 package.json 内` "compile": "babel src/babel --out-dir compiled"`运行有什么区别？为什么后者报错 无法将“babel”项识别
   为开发依赖安装而不是全局安装
3. `dev:ts` 这个 `script` 是用了 `ts-node` 来代替原来在用的 `node` ，因为使用 node 无法识别 `TypeScript` 语言。
   `ts-node`执行未果？packaage.json 内的"type": "modules"定义错误，应该为 "type": "module",
4. 文档中 `js`文件 改为 `JS`文件。在编程中，语言的名称通常是严格定义并遵循一定的命名规范。对于 JavaScript 语言来说，官方文档和规范都使用大写字母"JS"来描述该语言，因此应该使用大写字母 JS 而不是小写字母 js 来描述它。同时，这也可以帮助减少混淆和错误拼写的可能性。
