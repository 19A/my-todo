import Home from "../pages/Home";
import Login from "../pages/Login";
import Category from "../pages/Category";
import Products from "../pages/Products";
import BillChart from "../pages/BillChart";
// import Person from "../pages/Person";

// unauthorized: 非系统内嵌套页面
export const routers = [
  // {
  //   path: "/app",
  //   authorized: true,
  //   component: Home,
  //   children: [
  //     {
  //       path: "/person",
  //       component: Products
  //     }
  //   ]
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
    path: "/category",
    component: Category
  },
  {
    path: "/products",
    authorized: true,
    component: Products
  }
];
