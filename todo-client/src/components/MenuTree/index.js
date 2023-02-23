import React, { Component } from "react";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  DesktopOutlined,
  PieChartOutlined,
  ContainerOutlined
} from "@ant-design/icons";
import { Menu } from "antd";

export class MenuTree extends Component {
  getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type
    };
  };
  getMenuItem = () => {
    return [
      this.getItem("Option 1", "1", <PieChartOutlined />),
      this.getItem("Option 2", "2", <DesktopOutlined />),
      this.getItem("Option 3", "3", <ContainerOutlined />),
      this.getItem("Navigation One", "sub1", <MailOutlined />, [
        this.getItem("Option 5", "5"),
        this.getItem("Option 6", "6"),
        this.getItem("Option 7", "7"),
        this.getItem("Option 8", "8")
      ]),
      this.getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
        this.getItem("Option 9", "9"),
        this.getItem("Option 10", "10"),
        this.getItem("Submenu", "sub3", null, [
          this.getItem("Option 11", "11"),
          this.getItem("Option 12", "12")
        ])
      ])
    ];
  };

  setMenuItem = (e) => {
    console.log("e", e);
  };
  render() {
    const items = this.getMenuItem();
    const { show } = this.props;
    return (
      <div className='menu-tree-container'>
        {show && (
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode='inline'
            theme='dark'
            //  inlineCollapsed={collapsed}
            items={items}
          />
        )}
      </div>
    );
  }
}
