import Home from "../pages/Home";
import Login from "../pages/Login";
import Person from "../pages/Person";
import BillChart from "../pages/BillChart";
import wechatVerify from "../pages/WechatVerify";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';



const ProductDetail = ({ match }) => {
  debugger;
  console.log("ProductDetail");
  return <h2>Product Detail: {match.params.id}</h2>
};
const NotFound = () => <h1>404 Not Found</h1>;
const Products = ({ routes }) => (
  <>
    <h1>Product List</h1>
    <ul>
      <li><Link to="/products/1">Product 1</Link></li>
      <li><Link to="/products/2">Product 2</Link></li>
      <li><Link to="/products/3">Product 3</Link></li>
    </ul>
  </>
);

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
  },
  {
    path: '/products',
    component: Products,
    exact: true,
    children: [
      { 
        path: '/products/1', 
        component: ProductDetail,
      }
    ]
  },
  // { path: '/products/1', component: ProductDetail,exact: true, }
];
