import Home from "../pages/Home";
import Login from "../pages/Login";
import Category from "../pages/Category";
import Products from "../pages/Products";
export const routers = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/home",
    exact: true,
    component: Home
    // component: () => import("../pages/Home")
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/category",
    exact: true,
    component: Category
  },
  {
    path: "/products",
    exact: true,
    component: Products
  }
];
