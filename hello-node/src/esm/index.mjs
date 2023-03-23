// import m from './module.mjs';
// console.log('m',m);

// src/esm/index.mjs
import md5 from "md5";

import { a, b as c } from "./module.mjs";
console.log("Hello World from c.");
c();
console.log(md5("Hello World"));
