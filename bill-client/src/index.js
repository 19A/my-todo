import React from "react";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, notification } from "antd";
// import locale from "antd/es/date-picker/locale/zh_CN";
// import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";

import { Page } from "@/components/Page";

import globalStore from "./store/index";
import { routers } from "./routers/index";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import variables from "@/assets/style/variable.less";
// // 根据路由配置生成路由
// const routerGenerator = () =>
//   routers.map(({ component, path, ...other }) => {
//     const Routes = component.then(function (raw) {
//       var Component = raw.default || raw;
//       return <Route component={Component} path={path} {...other}></Route>;
//     });
//     return <Routes />;
//   });

// 全局配置
console.log("var", variables);
const globalConfig = {
  locale: zhCN, // 本地化语言
  theme: {
    components: {
      Menu:{
        colorPrimary: variables["theme-color"]
      },
      Button:{
        colorPrimary: variables["button-color"],
        colorPrimaryHover: variables["button-color"],
        colorPrimaryActive: variables["button-color"],
      }
    },
    // token: {
    //   colorPrimary: variables["button-color"]
    // },
  },

};

// 提醒框
notification.config({
  placement: "bottomRight",
  bottom: 30,
  duration: 2,
  rtl: false // 一种阅读模式 right to left
});
    // if (redirect) {
      //   return <Redirect key={index} exact={exact} from={path} to={redirect} />;
      // }
      const configRoutes = (routes, extraProps = {}, switchProps = {}) =>
      routes ? (
        <Switch {...switchProps}>
          {routes.map((route, i) => ( 
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props => (
            <route.component {...props} {...extraProps} route={route} />
            )}
          />
          ))}
        </Switch>
        ) : null;
// const configRoutes = (routes) => (
//   routes ? <Switch>
//     {routes.map((route, index) => {
//       const { path, exact, redirect, component: Component, routes: subRoutes } = route;
//       return (
//         <Route
//           key={index}
//           path={path}
//           exact={true}
//           render={(props) => {
//             // if (subRoutes) {
//             //   console.log('props',props,subRoutes);
//             //   return <Component {...props} children={subRoutes}/>;
//             //   // return configRoutes(subRoutes);
//             // } else {
//             //   return <Component {...props}/>;
//             // }
//             // props = Object.assign({route}, props)
//             return (
//               route.render
//                 ? route.render
//                 : <route.component {...props} router={route}/>
//             )
//           }}
//         />
//       );
//     })}
//   </Switch>
//   : null
// );

const App = (app) => {
  return (
    <Switch>
       {configRoutes(routers)}
      {/* <Redirect from='/' to='/bill-chart' exact /> */}
      {/* {routers.map(
        ({ component: Comp, unauthorized, children, path, ...other }) => {
          return (
            <RouteWithSubRoutes key={index} {...route} />
            <Route {...other} key={path} path={path}>
              {unauthorized && <Comp />}
              {!unauthorized && (
                <Page>
                  <Comp />
                </Page>
              )}
            </Route>
          );
        }
      )}
      <Redirect from='/' to='/bill-chart' exact /> */}
    </Switch>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Provider store={globalStore}>
      <ConfigProvider {...globalConfig}>
        <App />
      </ConfigProvider>
    </Provider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
