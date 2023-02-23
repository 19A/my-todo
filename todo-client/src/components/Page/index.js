import react, { Component, Fragment, createRef } from "react";
import { withRouter } from "react-router-dom";
import { Space } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  MenuOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Dropdown, Modal, Form, Input, Menu, Button, Icon } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MenuTree } from "@/components/MenuTree";

import defaultAvatar from "@/assets/avatar.jpg";
import { pwdModifyApi } from "@/services";

import "./index.less";
import { inject, observer } from "mobx-react";

const menuConfig = [
  {
    label: "LOGO",
    key: "home"
  }
  // {
  //   label: (
  //     <a
  //       href='http://1.117.165.71:8889'
  //       target='_blank'
  //       rel='noopener noreferrer'
  //     >
  //       公网
  //     </a>
  //   ),
  //   key: "public"
  // }
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
      menuShow: true
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

  toggleMenu = () => {
    this.setState({ menuShow: !this.state.menuShow });
  };

  render() {
    const { collapsed, menuShow } = this.state;
    const { showHeader = true, children } = this.props;
    return (
      <div className='page-container'>
        {showHeader && (
          <div className='header-container pc-menu'>
            <div className='left'>
              {this.getMenu()}
              <div className='mobile-collapse' onClick={this.toggleMenu}>
                {menuShow ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              </div>
              {/* <MenuOutlined /> */}
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
                  </Space>
                </span>
              </Dropdown>
            </div>
          </div>
        )}
        <MenuTree show={menuShow} />
        <div className='content-container'>{children}</div>;
      </div>
    );
  }
}
