import React from "react";
import { Layout } from "antd";
import Login from "./Login";
const { Header, Footer, Content } = Layout;
const Index = () => (
  <Layout>
    <Header></Header>
    <Layout>
      {/* <Content></Content> */}
      <Login />
    </Layout>
    {/* <Footer>Footer</Footer> */}
  </Layout>
);
export default Index;
