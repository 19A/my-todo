import Home from "../pages/Home";
import Login from "../pages/Login";
import Category from "../pages/Category";
import Products from "../pages/Products";
export const routers = [
  {
    path: "/home",
    authorized: true,
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
