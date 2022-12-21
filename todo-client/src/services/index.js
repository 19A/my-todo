/**
 * @author biao.zhu@going-link.com
 * @since 2022-12-08 16:42:11
 * @lastTime 2022-12-14 15:15:36
 * @description
 * @copyright Copyright (c) 2020, Hand
 */
import { get, post, baseURL } from "../utils/network";

/**
 * @description 注册api
 * @param {*} 注册信息
 */
export function registerApi(data) {
  return post(`${baseURL}/register`, data);
}

/**
 * @description 修改密码api
 * @param {*} 注册信息
 */
export function pwdModifyApi(data) {
  return post(`${baseURL}/modify-pwd`, data);
}

/**
 * @description list
 * @param {*} 列表查询
 */
export function queryListApi(data) {
  return post(`${baseURL}/item/query`, data);
}

/**
 * @description list
 * @param {*} 新增子项
 */
export function createItemApi(data) {
  return post(`${baseURL}/item/create`, data);
}

/**
 * @description list
 * @param {*} 删除子项
 */
export function deleteItemApi(data) {
  return post(`${baseURL}/item/delete`, data);
}
