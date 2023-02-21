import react, { Component, Fragment, createRef } from "react";
import { withRouter } from "react-router-dom";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Dropdown, Modal, Form, Input, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Space } from "antd";
import defaultAvatar from "@/assets/avatar.jpg";
import { pwdModifyApi } from "@/services";
// const { Header as AntHeader, Content as AntHeader } = Layout;

import "./index.less";
import { inject, observer } from "mobx-react";

const menuConfig = [
  { title: "首页", path: "/" },
  { title: "大数据平台", path: "/" },
  { title: "掘金-博文", path: "/" },
  { title: "CSDN-博文", path: "/" }
];
const Item = Form.Item;

const menuInfo = [
  {
    label: "目录1",
    key: "mail"
  },
  {
    label: "目录2",
    key: "app",
    disabled: true
  },
  // {
  //   label: "Navigation Three - Submenu",
  //   key: "SubMenu",
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: "group",
  //       label: "Item 1",
  //       children: [
  //         {
  //           label: "Option 1",
  //           key: "setting:1"
  //         },
  //         {
  //           label: "Option 2",
  //           key: "setting:2"
  //         }
  //       ]
  //     },
  //     {
  //       type: "group",
  //       label: "Item 2",
  //       children: [
  //         {
  //           label: "Option 3",
  //           key: "setting:3"
  //         },
  //         {
  //           label: "Option 4",
  //           key: "setting:4"
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    label: (
      <a
        href='http://1.117.165.71:8889'
        target='_blank'
        rel='noopener noreferrer'
      >
        公网
      </a>
    ),
    disabled: true,
    key: "public"
  }
];

@inject("store")
@observer
@withRouter
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuKey: "mail",
      collapsed: true
    };
  }

  formRef = createRef();

  setMenuKey(e) {
    console.log("e", e);
    this.setState({ menuKey: e.key });
  }

  getMenu = () => {
    return (
      <ul className='menu-ul'>
        {menuConfig.map(({ title, path }) => {
          return (
            <li
              key='title'
              className='li'
              onClick={(path) => this.props.history.push(path)}
            >
              {title}
            </li>
          );
        })}
      </ul>
    );
  };

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
          <Item label='name' name='username' rules={[{ required: true }]}>
            <Input.Password />
          </Item>
          <Item label='old' name='password' rules={[{ required: true }]}>
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
        debugger;
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

  logout = () => {
    window.alert("退出系统");
    this.props.history.push("/login");
  };

  getOverlay = () => {
    const configList = [
      { title: "修改密码", action: this.modify },
      { title: "退出系统", action: this.logout }
    ];
    return configList.map(({ title, action }) => ({
      key: title,
      label: (
        <span target='_blank' rel='noopener noreferrer' onClick={action}>
          {title}
        </span>
      )
    }));
  };

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { userInfo } = this.props.store;
    const { username, avator } = userInfo;
    const { menuKey, collapsed } = this.state;

    return (
      <>
        {/* <Menu
          items={menuInfo}
          mode='horizontal'
          onClick={this.setMenuKey}
          selectedKeys={[menuKey]}
          className='menu-container pc-menu'
        /> */}
        <Button
          type='primary'
          className='mobile-collapse'
          onClick={this.toggleCollapsed}
          style={{
            marginBottom: 16
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          mode='inline'
          items={menuInfo}
          selectedKeys={[menuKey]}
          onClick={this.setMenuKey}
          inlineCollapsed={collapsed}
          className='menu-container mobile-menu'
          style={collapsed ? { display: "none" } : {}}
        />

        <div className='header-container menu-container pc-menu'>
          <div className='left'>
            <section className='logo'>LOGO</section>
            {this.getMenu()}
          </div>
          <div className='right'>
            <Dropdown menu={{ items: this.getOverlay() }}>
              <span>
                <Space>
                  <img
                    alt='用户头像'
                    referrer='no-referrer'
                    className='user-avatar'
                    src={defaultAvatar}
                  />
                  <span className='user-name'>{username}</span>
                  <DownOutlined />
                </Space>
              </span>
            </Dropdown>
          </div>
        </div>
      </>
    );
  }
}

export class Content extends Component {
  render() {
    return <div className='content-container' {...this.props}></div>;
  }
}
