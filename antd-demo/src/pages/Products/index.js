import React, { Fragment } from "react";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
export const Products = () => (
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Content>Content</Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
);
