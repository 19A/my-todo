/* eslint-disable import/no-anonymous-default-export */
const global = {
  // user.js
  accessToken: "",
  refreshToken: null,
  userId: "",
  name: "",
  age: "",
  gender: "",
  password: "",
  img: "",

  // global.js
  // 发送请求的
  Http: {},
  // 页面跳转的
  navigation: null,
  search: "",
  apiVersion: null,
  isWXAppInstalled: false,
  wxAppInstallUrl: null,
  isWXAppSupportApi: false,
  Socket: {}
};

export default global;
