/**
 * @author biao.zhu@going-link.com
 * @since 2023-03-22 10:33:43
 * @lastTime 2023-03-22 11:39:38
 * @description 这是一个基础的 Node.js 服务端程序，利用了 HTTP 模块启动本地服务，期间利用 FS 模块的 I/O 能力对本地文件进行读取，而 PATH 模块则简化了文件操作过程中的路径处理和兼容问题
 * @tips 本地开发不能直接通过 file:// 协议在浏览器里访问本地 HTML 内的js 文件，这是因为浏览器对 JavaScript 的安全性要求，会触发 CORS 错误，因此需要启动本地服务并通过 http:// 协议访问。
 * @copyright Copyright (c) 2020, Hand
 */
const { readFileSync } = require("fs");
const { resolve } = require("path");
const { createServer } = require("http");

/**
 * 判断是否ESM文件
 * @param {*} url
 */
function isESM(url) {
  return String(url).endsWith("mjs");
}

/**
 * 获取MIME Type信息
 * @param {*} url
 * @tips `.mjs` 和 `.js` 一样，都使用 JavaScript 的 MIME Type
 */
function mimeType(url) {
  return isESM(url) ? "application/javascript" : "text/html";
}

/**
 * 获取文件路径
 * @param {*} url
 */
function entryFile(url) {
  const file = isESM(url) ? `../src/esm${url}` : "index.html";
  return resolve(__dirname, file);
}

/**
 * 创建http服务器
 */
const app = createServer((request, response) => {
  // 获取请求时的相对路径，如网页路径、网页里的 JS 文件路径等
  const { url } = request;
  // 转换成对应的本地文件路径并读取其内容
  const entry = entryFile(url);
  const data = readFileSync(entry, "utf-8");
  // console.log("entry", entry, "data", data);
  response.writeHead(200, {
    "Content-Type": mimeType(url)
  });
  response.end(data);
});

/**
 * 指定端口启动本地服务
 */
const port = 3007;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at:`);
  console.log();
  console.log(`  ➜  Local:  http://localhost:${port}/`);
  console.log();
});
