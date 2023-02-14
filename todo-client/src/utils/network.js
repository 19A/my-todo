/**
 * @author biao.zhu@going-link.com
 * @since 2022-12-02 17:48:45
 * @lastTime 2022-12-05 10:06:47
 * @description axios封装处理
 * @copyright Copyright (c) 2020, Hand
 */

// import Qs from "qs";
// import Qs from "querystring";
import axios from "axios";
import { notification } from "antd";
import { getUserToken, getUserInfo, clearUser } from "./index";

const baseURL = "/api";
const ERROR_DURATION = 2;
const service = new axios.create({
  baseURL,
  timeout: 55000 // 超时时间
  // transformRequest: [
  //   function (data, headers) {
  //     // 对发送的 data 进行任意转换处理
  //     debugger;
  //     return data;
  //   }
  // ]
});

// 自定义序列化 == 目前存在问题，仅支持数组，不支持嵌套对象
const testSerializer = function (params = []) {
  const keys = Object.keys(params);
  const arr = [];
  keys.forEach((item) => {
    if (Array.isArray(params[item])) {
      const url = params[item].map((_) => `${item}=${_}`).join("&");
      arr.push(url);
    } else {
      arr.push(`${item}=${params[item]}`);
    }
  });
  const result = arr.join("&");
  console.log(result);
  return `${result}`;
};

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前处理config
    if (getUserInfo()) {
      config.headers.Authorization = "Bearer " + getUserToken();
      config.headers.token = getUserToken();
    }

    // //处理GET数组参数序列化
    // if (config.method === "get") {
    //   // config.headers["Content-Type"] = "text/plain";
    //   // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    //   // config.headers["Content-Type"] = "application/x-www-form-urlencoded";

    //   config.paramsSerializer = {
    //     // serialize: testSerializer,
    //     serialize: (params) => {
    //       debugger;
    //       const a = qs.stringify(
    //         {
    //           // foo: "bar",
    //           // baz: ["qux", "quux"],
    //           corge: {
    //             b: "b1"
    //           }
    //         },
    //         { arrayFormat: "brackets", encode: false }
    //       );
    //       debugger;
    //       return a;
    //     }
    //   };
    // }
    return config;
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
    const { code, message } = error.response.data;
    // 统一弹框抛错
    if (message && code !== 200) {
      const msg =
        typeof message === "string" ? message : JSON.stringify(message);
      notification.error({ message: msg, duration: ERROR_DURATION });
    }
    switch (error.response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        setTimeout(() => {
          window.location.pathname = "/login";
        }, 10000);
        break;
      case 403:
        clearUser();
        window.alert("登录过期，请重新登录");
        // 403 token过期 对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          window.location.pathname = "/login";
          // router.replace({
          //   path: "/login",
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   }
          // });
        }, 100000);
        break;
      // 404请求不存在
      case 404:
        // Toast({
        //   message: "网络请求不存在",
        //   duration: 1500,
        //   forbidClick: true
        // });
        break;
      default:
        notification.error({
          message: error.response.statusText,
          duration: ERROR_DURATION
        });
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
    service
      .get(url, { params })
      .then((response) => {
        const { code, message } = response.data;
        if (message && code !== 200) {
          const msg =
            typeof message === "string" ? message : JSON.stringify(message);
          notification.error({ message: msg, duration: ERROR_DURATION });
          resolve();
        } else {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, {
        ...params
      })
      .then((response) => {
        const { code, message } = response.data;
        if (message && code !== 200) {
          const msg =
            typeof message === "string" ? message : JSON.stringify(message);
          notification.error({ message: msg, duration: ERROR_DURATION });
          resolve();
        } else {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

export { baseURL };
