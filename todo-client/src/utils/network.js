/**
 * @author biao.zhu@going-link.com
 * @since 2022-12-02 17:48:45
 * @lastTime 2022-12-05 10:06:47
 * @description axios封装处理
 * @copyright Copyright (c) 2020, Hand
 */

import axios from "axios";

// const token = getUserToken();

const baseURL = "/";
const service = new axios.create({
  baseURL,
  timeout: 55000 // 超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error) {
      window.alert("error", JSON.stringify(error));
    }
    switch (error.response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        // router.replace({
        //   path: "/login",
        //   query: {
        //     redirect: router.currentRoute.fullPath
        //   }
        // });
        break;

      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        // Toast({
        //   message: "登录过期，请重新登录",
        //   duration: 1000,
        //   forbidClick: true
        // });
        // // 清除token
        // localStorage.removeItem("token");
        // store.commit("loginSuccess", null);
        // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        // setTimeout(() => {
        //   router.replace({
        //     path: "/login",
        //     query: {
        //       redirect: router.currentRoute.fullPath
        //     }
        //   });
        // }, 1000);
        break;

      // 404请求不存在
      case 404:
      // Toast({
      //   message: "网络请求不存在",
      //   duration: 1500,
      //   forbidClick: true
      // });
      // break;
      // 其他错误，直接抛出错误提示
      default:
      // Toast({
      //   message: error.response.data.message,
      //   duration: 1500,
      //   forbidClick: true
      // });
    }
    return Promise.reject(error);
  }
);

/**
 * @param {String} url 请求地址
 * @param {Obejct} params 请求参数
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        data: params
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}
