import React, { Fragment } from "react";
import { ConfigProvider } from "antd";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom/client";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import globalStore from "./store/index";
import { routers } from "./routers/index";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
// // 根据路由配置生成路由
// const routerGenerator = () =>
//   routers.map(({ component, path, ...other }) => {
//     const Routes = component.then(function (raw) {
//       var Component = raw.default || raw;
//       return <Route component={Component} path={path} {...other}></Route>;
//     });
//     return <Routes />;
//   });

const App = (app) => {
  // console.log("app", app);
  return (
    <Switch>
      {routers.map(({ component, path, ...other }) => {
        return (
          <Route
            key={path}
            component={component}
            path={path}
            {...other}
          ></Route>
        );
      })}
    </Switch>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={globalStore}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b"
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
