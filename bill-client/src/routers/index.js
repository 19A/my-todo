import Home from "../pages/Home";
import Login from "../pages/Login";
import Person from "../pages/Person";
import BillChart from "../pages/BillChart";
import wechatVerify from "../pages/WechatVerify";
// unauthorized: 非系统内嵌套页面
export const routers = [
  // {
  //   path: "/moblie",
  //   component: Mobile
  // },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/login",
    component: Login,
    unauthorized: true
  },
  {
    path: "/bill-chart",
    component: BillChart
  },
  {
    path: "/person",
    component: Person
    // unauthorized: true
  },
  {
    path: "/wechat-verify",
    component: wechatVerify,
    unauthorized: true
  }
];
