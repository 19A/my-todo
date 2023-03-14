import react, { Component, Fragment, createRef } from "react";
import { withRouter } from "react-router-dom";
import { Avatar, notification, Space } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  MenuOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Dropdown, Modal, Form, Input, Menu, Button, Icon, Result } from "antd";
import { SideBar } from "@/components/SideBar";
import { getUserToken, getUserInfo, clearUser } from "@@/src/utils";

import defaultAvatar from "@/assets/avatar_pro.png";
import { pwdModifyApi } from "@/services";

import "./index.less";
import { inject, observer } from "mobx-react";

const menuConfig = [
  {
    label: "LOGO",
    key: "home"
  }
];
const Item = Form.Item;

@inject("store")
@observer
@withRouter
export class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuKey: "home",
      collapsed: true,
      menuShow: false
    };
  }

  formRef = createRef();

  // 设置当前菜单
  setMenuKey(e) {
    console.log("e", e);
    this.setState({ menuKey: e.key });
  }

  // 获取菜单
  getMenu = () => {
    return (
      <ul className='menu-ul'>
        {menuConfig.map(({ label, path = "/" }) => {
          return (
            <li
              key='title'
              className='li'
              onClick={(path) => this.props.history.push(path)}
            >
              {label}
            </li>
          );
        })}
      </ul>
    );
  };

  // 显示菜单
  toggleMenu = () => {
    this.setState({ menuShow: !this.state.menuShow });
  };

  // 打开修改密码弹框
  modify = () => {
    Modal.confirm({
      title: "修改密码",
      icon: null,
      content: (
        <Form
          ref={(node) => {
            this.formRef.current = node;
          }}
          preserve={false}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={(values) => {
            window.alert("onFinish", JSON.stringify(values));
          }}
        >
          <Item label='name' name='userCode' rules={[{ required: true }]}>
            <Input.Password />
          </Item>
          <Item label='old' name='userCode' rules={[{ required: true }]}>
            <Input.Password />
          </Item>
          <Item label='new' name='confirmPwd' rules={[{ required: true }]}>
            <Input.Password />
          </Item>
        </Form>
      ),
      onOk: async () => {
        console.log("this.formRef", this.formRef);
        const formEntity = this.formRef.current;
        const validatesRes = await formEntity.validateFields();
        if (!validatesRes) return Promise.reject();
        const values = formEntity.getFieldsValue();
        const res = await pwdModifyApi({ ...values });
        if (!res) return Promise.reject();
        //密码修改成功 跳转重新登录
        window.alert("密码修改成功");
        this.props.history.push("/login");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  // 退出
  logout = () => {
    window.alert("退出系统");
    clearUser();
    this.props.history.push("/login");
  };

  // 获取下拉菜单
  getOverlay = () => {
    const overlayConfig = [
      { title: "个人中心", path: "/person" },
      { title: "修改密码", action: this.modify },
      { title: "退出系统", action: this.logout }
    ];
    return overlayConfig.map((i) => {
      // console.log("action", action);
      let { title, action, path } = i;
      if (!action) {
        action = () => this.props.history.push(path);
      }
      return {
        key: title,
        label: (
          <span target='_blank' rel='noopener noreferrer' onClick={action}>
            {title}
          </span>
        )
      };
    });
  };

  notFound = () => <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" onClick={() => {
      this.props.history.push("/login")
    }}>Back Login</Button>}
  />

  render() {
    const { collapsed, menuShow } = this.state;
    const { showHeader = true, children } = this.props;
    const token = getUserToken();
    if (!token) {
      return this.notFound();
    }
    return (
      <div className='page-container'>
        {showHeader && (
          <div className='header-container pc-menu'>
            <div className='left'>
              {this.getMenu()}
              <div className='mobile-collapse' onClick={this.toggleMenu}>
                {menuShow ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              </div>
            </div>
            <div className='right'>
              <Dropdown menu={{ items: this.getOverlay() }}>
                <Avatar  size='large' src={getUserInfo()?.avator || defaultAvatar}/>
              </Dropdown>
            </div>
          </div>
        )}
        <SideBar show={menuShow} />
        <div className='content-container'>{children}</div>;
      </div>
    );
  }
}
