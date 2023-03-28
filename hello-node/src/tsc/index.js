"use strict";
exports.__esModule = true;
// src/ts/index.ts
var greet_1 = require("./greet");
// 单个问候语
var greeting = greet_1["default"]('Petter');
console.log(greeting);
// 多个问候语
var greetings = greet_1["default"](['Petter', 'Tom', 'Jimmy']);
console.log(greetings);
