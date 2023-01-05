import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button, Checkbox, Form, Input, Row, Col, notification } from "antd";

import { loginApi, registerApi } from "@/services/index.js";

import "./login.css";
const baseURL = "https://login";

const defaultFormStyle = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const defaultFormConfig = {
  autoComplete: "off"
};
const defaultFormItemStyle = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};
/*eslint-disable*/
@inject("store")
@observer
@withRouter
export default class Login extends Component {
  constructor(props) {
    super(props);
    window.__globalStore = props; // 对外暴露 用于调试
    console.log("props", props);
    this.state = {
      isLogin: true
    };
  }

  // 忘记密码
  forgetPassword = (values) => {};

  // 登录
  onLogin = async (data) => {
    const res = await loginApi(data);
    if (res) {
      // 登录成功
      this.saveUser(res);
      notification.success({
        message: "登录成功！"
      });
      this.props.history.push("/home");
    }
  };

  saveUser(data) {
    const {
      data: { token, userData }
    } = data;
    this.props.store.globalToken = token;
    this.props.store.userInfo = userData;
  }

  onRegister = async (data) => {
    const res = await registerApi(data);
    if (res) {
      // 注册成功 存入用户信息至本地 并跳转到登录界面
      this.saveUser(res);
      notification.success({
        message: "注册成功，请登录账号"
      });
      this.tabChange("login");
    } else {
      // 注册失败，若为用户已存在，则跳转登录界面
    }
  };

  tabChange = (key) => {
    this.setState({
      isLogin: key === "login"
    });
  };

  // onRegisterFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  // onLoginFailed = (errorInfo) => {
  //   this.props.history.push("/home");
  //   console.log("Failed:", errorInfo);
  // };

  render() {
    const { isLogin } = this.state;
    return (
      <div className='login-wrapper'>
        <div className='login-tab'>
          <div
            className={"login-tab-item" + (isLogin ? " tab-active" : "")}
            onClick={() => this.tabChange("login")}
          >
            登录
          </div>
          <div
            className={"login-tab-item" + (!isLogin ? " tab-active" : "")}
            onClick={() => this.tabChange("register")}
          >
            注册
          </div>
        </div>
        {isLogin && (
          <div className='login'>
            <Form
              name='login'
              initialValues={{
                remember: true
              }}
              onFinish={this.onLogin}
              {...defaultFormStyle}
              {...defaultFormConfig}
            >
              <Form.Item
                label='Username'
                name='username'
                rules={[
                  {
                    required: true,
                    message: "Please input your username!"
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 24
                }}
              >
                <Button
                  style={{ width: "100%" }}
                  type='primary'
                  htmlType='submit'
                >
                  登录
                </Button>
              </Form.Item>
              <Row align='space-between'>
                <Col span={9}>
                  <Form.Item
                    name='remember'
                    valuePropName='checked'
                    wrapperCol={{
                      offset: 8,
                      span: 16
                    }}
                  >
                    <Checkbox>记住</Checkbox>
                  </Form.Item>
                </Col>
                <a onClick={this.forgetPassword}>忘记密码</a>
              </Row>
            </Form>
          </div>
        )}
        {!isLogin && (
          <div className='register'>
            <Form
              name='register'
              labelCol={{
                span: 8
              }}
              wrapperCol={{
                span: 16
              }}
              initialValues={{
                remember: true
              }}
              onFinish={this.onRegister}
              onFinishFailed={this.onRegisterFailed}
              autoComplete='off'
            >
              <Form.Item
                label='Username'
                name='username'
                rules={[
                  {
                    required: true,
                    message: "Please input your username!"
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label='Comfirm'
                name='confirmPwd'
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!"
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 24
                }}
              >
                <Button
                  style={{ width: "100%" }}
                  type='primary'
                  htmlType='submit'
                >
                  立即注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
