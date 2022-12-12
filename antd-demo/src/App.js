import React, { Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { routers } from "./routers/index";

import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { Products } from "./pages/Products";

// 根据路由配置生成路由
// const routerGenerator = () =>
//   routers.map(({ component, path, ...other }) => {
//     const Routes = component.then(function (raw) {
//       var Component = raw.default || raw;
//       return <Route component={Component} path={path} {...other}></Route>;
//     });
//     return <Routes />;
//   });

export default function App() {
  return (
    <Switch>
      <Route path='/login'>{Home}</Route>
      <Route path='/category'>{Category}</Route>
      <Route path='/products'>{Products}</Route>
    </Switch>
  );
}
