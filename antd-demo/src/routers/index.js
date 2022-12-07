export const routers = [
  {
    path: "/",
    component: import("../pages/Home")
  },
  {
    path: "/category",
    exact: true,
    component: import("../pages/Category")
  },
  {
    path: "/products",
    exact: true,
    component: import("../pages/Products")
  }
];
