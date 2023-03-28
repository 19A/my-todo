// src/ts/index.ts
import md5 from 'md5';
console.log(md5('Hello World'))

// ps:直接ts-node运行就会报错，因为缺少 md5 这个包的类型定义，根据命令行的提示，安装 @types/md5 这个包。