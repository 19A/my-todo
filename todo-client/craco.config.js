/* craco.config.js */
//参考： https://zhuanlan.zhihu.com/p/370663645
const path = require("path");
const cracoLess = require("craco-less");
const addPath = (dir) => path.join(__dirname, dir);
const resolve = (dir) => path.resolve(__dirname, dir);
// const ConfigWebpackPlugin = require("config-webpack");
// const { ESLINT_MODES, POSTCSS_MODES, paths } = require("@craco/craco");
module.exports = {
  webpack: {
    // 别名配置
    alias: {
      "@": resolve("src")
    }
  },
  // 第三方ui库按需加载，如antd
  // babel1: {
  //   presets: [
  //     "@babel/preset-env",
  //     {
  //       // loose: false,
  //       // shippedProposals: true
  //     }
  //   ],
  //   plugins: [
  //     //第一个 style 为 true ,需要配置 craco-less一起才能生效
  //     // ["import", { libraryName: "antd", style: true }, "antd"],
  //     //第二种 style 为css ,不需要 craco-less
  //     // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: "css" }],
  //     ["@babel/plugin-proposal-decorators", { legacy: true }]
  //     // [
  //     //   "@babel/plugin-proposal-decorators",
  //     //   { legacy: true, loose: true },
  //     //   "decorators"
  //     // ],
  //     // [
  //     //   "@babel/plugin-proposal-class-properties",
  //     //   { legacy: true, loose: true },
  //     //   "class-properties"
  //     // ]
  //   ]
  // },f
  babel: {
    // 支持装饰器模式语法
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }]
      // ["@babel/eslint-parser"]
    ]
  },
  plugins: [
    {
      plugin: cracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1890ff" },
            javascriptEnabled: true,
            //配置全局less 变量，不需要在使用的地方导入了
            globalVars: {
              hack: `true; @import '~@/assets/style/variable.less';`
            }
          }
        }
      }
    }
  ],
  // 服务器代理配置
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        changeOrigin: true
        // pathRewrite: {
        //   "^/api": ""
        // }
      }
    }
  }
};
