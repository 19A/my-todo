import react, { Component, Fragment, createRef } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, Modal, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Space } from "antd";
import { pwdModifyApi } from "@/services";
// const { Header as AntHeader, Content as AntHeader } = Layout;

import "./index.less";

const menuConfig = [
  { title: "首页", path: "/" },
  { title: "大数据平台", path: "/" },
  { title: "掘金-博文", path: "/" },
  { title: "CSDN-博文", path: "/" }
];
const Item = Form.Item;

@withRouter
export class Header extends Component {
  formRef = createRef();

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

  validates = (form) => {
    debugger;
    const a = form.validateFields();
    debugger;
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
          <Item label='old' name='pwd-old' rules={[{ required: true }]}>
            <Input.Password />
          </Item>
          <Item label='new' name='pwd-new' rules={[{ required: true }]}>
            <Input.Password />
          </Item>
          <Item label='confirm' name='pwd-again' rules={[{ required: true }]}>
            <Input.Password />
          </Item>
        </Form>
      ),
      onOk: async () => {
        debugger;
        console.log("this.formRef", this.formRef);
        const formEntity = this.formRef.current;
        const validatesRes = await formEntity.validateFields();
        if (!validatesRes) return Promise.reject();
        const values = formEntity.getFieldsValue();
        // const res = await pwdModifyApi(values);
        // if (!res) return Promise.reject();
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

  render() {
    return (
      <div className='header-container'>
        <div className='left'>
          <section className='logo'>LOGO</section>
          {this.getMenu()}
        </div>
        <div className='right'>
          <Dropdown menu={{ items: this.getOverlay() }}>
            <span>
              <Space>
                <span className='user-name'>用户XXXX</span>
                <img
                  alt='用户头像'
                  referrer='no-referrer'
                  className='user-avatar'
                  src='../assets/avatar.jpg'
                />
                <DownOutlined />
              </Space>
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export class Content extends Component {
  render() {
    return <div className='content-container' {...this.props}></div>;
  }
}
