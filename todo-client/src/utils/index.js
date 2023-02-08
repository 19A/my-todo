import globalStore from "@/store/index";

const isNumber = (num) => typeof num === "number";

export function getUserToken() {
  // 优先从mobx内取 再从localStorage中取
  return globalStore.token || localStorage.getItem("token");
}

export function getUserInfo() {
  // 优先从mobx内取 再从localStorage中取
  const token =
    globalStore.userInfo || JSON.parse(localStorage.getItem("userInfo"));
  return token;
}

export function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "M+": (date.getMonth() + 1).toString(), // 月
    "D+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "m+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}

export function clearUser() {
  globalStore.token = null;
  globalStore.userInfo = null;
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
}

export function nullValueFilter(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
  return obj;
}

export function createPagination(data) {
  //   page: 1
  // size: 10
  // totalElements: 13
  // totalPages: 2

  const { page, size, totalElements } = data;
  return {
    pageSize: Number(size) || Number(data.pageSize),
    current: isNumber(Number(page)) ? Number(page) : Number(data.current),
    // 每页大小
    total: isNumber(totalElements) ? Number(totalElements) : Number(data.total)
    // showTotal: totalRender
    // showQuickJumper: true,
    // showSizeChanger: true,
    // pageSizeOptions: _isArray(list) && !_isEmpty(list) ? list : PAGE_SIZE_OPTIONS,
  };
}
