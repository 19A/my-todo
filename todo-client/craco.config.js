/* craco.config.js */
//参考： https://zhuanlan.zhihu.com/p/370663645
const path = require("path");
const cracoLess = require("craco-less");
// const addPath = (dir) => path.join(__dirname, dir);
const resolve = (dir) => path.resolve(__dirname, dir);
// const ConfigWebpackPlugin = require("config-webpack");
// const { ESLINT_MODES, POSTCSS_MODES, paths } = require("@craco/craco");
module.exports = {
  webpack: {
    // 别名配置
    alias: {
      "@": resolve("src"),
      "@@": resolve("."),
      "@assets": resolve("src/assets"),
      "@common": resolve("src/common"),
      "@components": resolve("src/components"),
      "@hooks": resolve("src/hooks"),
      "@pages": resolve("src/pages"),
      "@store": resolve("src/store"),
      "@utils": resolve("src/utils")
    }
  },
  // TODO：临时手动去除eslint校验 避免 出现装饰器报错！
  eslint: {
    enable: false
  },
  babel: {
    // presets: [
    //   "@babel/preset-env",
    //   {
    //     loose: true,
    //     modules: false
    //   }
    // ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-private-methods", { loose: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }]
    ]
  },
  plugins: [
    {
      plugin: cracoLess,
      // options: {
      //   lessLoaderOptions: {
      //     lessOptions: {
      //       modifyVars: { "@primary-color": "#1890ff" },
      //       javascriptEnabled: true,
      //       //配置全局less 变量，不需要在使用的地方导入了
      //       globalVars: {
      //         hack: `true; @import '~@/assets/style/variable.less';`
      //       }
      //     }
      //   }
      // }
      options: {
        // 此处根据 less-loader 版本的不同会有不同的配置，详见 less-loader 官方文档
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  // 服务器代理配置 https://www.jianshu.com/p/6e824b668a0d
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
