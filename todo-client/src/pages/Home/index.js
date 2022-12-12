import React, { Fragment } from "react";
import { Layout } from "antd";
import Login from "./Login";
const { Header, Footer, Sider, Content } = Layout;
const Home = () => (
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Content>Content</Content>
      <Login />
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
);
export default Home;
