/**
 * @author biao.zhu@going-link.com
 * @since 2022-12-08 16:42:11
 * @lastTime 2022-12-14 15:15:36
 * @description
 * @copyright Copyright (c) 2020, Hand
 */
import { get, post } from "../utils/network";

/**
 * @description 登录api
 * @param {*} 用户登录信息
 */
export function loginApi(data) {
  return post(`/user/login`, data);
}

/**
 * @description 注册api
 * @param {*} 注册信息
 */
export function registerApi(data) {
  return post(`/user/register`, data);
}

/**
 * @description 修改密码api
 * @param {*} 注册信息
 */
export function pwdModifyApi(data) {
  return post(`/user/modify-pwd`, data);
}

/**
 * @description todo-list
 * @param {*} 列表查询
 */
export function queryListApi(data) {
  return get(`/task/query`, data);
}

/**
 * @description 新增子项
 * @param {*}
 */
export function createItemApi(data) {
  return post(`/task/create`, data);
}

/**
 * @description 删除子项
 * @param {*}
 */
export function deleteItemApi(data) {
  return post(`/task/delete`, data);
}

/**
 * @description 修改子项
 * @param {*}
 */
export function modifyItemApi(data) {
  return post(`/task/update`, data);
}

/**
 * @description 查询账单详情
 * @param {*}
 */
export function queryBillListApi(data) {
  return get(`/bill/query`, data);
}
