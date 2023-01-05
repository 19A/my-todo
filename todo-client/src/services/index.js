/**
 * @author biao.zhu@going-link.com
 * @since 2022-12-08 16:42:11
 * @lastTime 2022-12-14 15:15:36
 * @description
 * @copyright Copyright (c) 2020, Hand
 */
import { get, post, baseURL } from "../utils/network";

/**
 * @description 登录api
 * @param {*} 用户登录信息
 */
export function loginApi(data) {
  return post(`${baseURL}/user/login`, data);
}

/**
 * @description 注册api
 * @param {*} 注册信息
 */
export function registerApi(data) {
  return post(`${baseURL}/user/register`, data);
}

/**
 * @description 修改密码api
 * @param {*} 注册信息
 */
export function pwdModifyApi(data) {
  return post(`${baseURL}/user/modify-pwd`, data);
}

/**
 * @description list
 * @param {*} 列表查询
 */
export function queryListApi(data) {
  return post(`${baseURL}/task/query`, data);
}

/**
 * @description list
 * @param {*} 新增子项
 */
export function createItemApi(data) {
  return post(`${baseURL}/task/create`, data);
}

/**
 * @description list
 * @param {*} 删除子项
 */
export function deleteItemApi(data) {
  return post(`${baseURL}/task/delete`, data);
}
