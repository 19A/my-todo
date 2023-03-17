import Home from "../pages/Home";
import Login from "../pages/Login";
import Person from "../pages/Person";
import BillChart from "../pages/BillChart";
import wechatVerify from "../pages/WechatVerify";

export const routers = [
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
  },
  {
    path: "/wechat-verify",
    component: wechatVerify,
    unauthorized: true
  }
];
