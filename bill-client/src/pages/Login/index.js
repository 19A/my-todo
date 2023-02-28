import React from "react";
import { Layout } from "antd";
import Login from "./Login";
const { Header, Footer, Content } = Layout;
const Index = () => {
  return (
    <div className='root-container'>
      <div className='lg-header'>MY-TODO</div>
      <Login />
    </div>
  );
};
export default Index;
