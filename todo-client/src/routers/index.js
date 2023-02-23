import Home from "../pages/Home";
import Login from "../pages/Login";
import Category from "../pages/Category";
import Products from "../pages/Products";
// import Person from "../pages/Person";
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
    // authorized: true,
    component: Home
  },
  {
    path: "/login",
    component: Login
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
