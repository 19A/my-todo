import Home from "../pages/Home";
import Category from "../pages/Category";
import Products from "../pages/Products";
export const routers = [
  {
    path: "/",
    exact: true,
    component: Home
    // component: () => import("../pages/Home")
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
