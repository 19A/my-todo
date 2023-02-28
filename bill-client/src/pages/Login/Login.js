import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Space,
  notification
} from "antd";

import { loginApi, registerApi } from "@/services/index.js";

import "./login.less";
// import styles from "./login.less";
const baseURL = "https://login";

const defaultFormStyle = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 16 },
  layout: "vertical"
};
const defaultFormConfig = {
  autoComplete: "off"
};

const ERROR_MSG = {
  invalid: "无效的用户名或密码"
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
      this.props.history.push("/bill-chart");
    }
  };

  saveUser(data) {
    const {
      data: { token, ...userInfo }
    } = data;
    // 存入mobx和localStorage
    this.props.store.token = token;
    this.props.store.userInfo = userInfo;
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  onRegister = async (data) => {
    const res = await registerApi(data);
    if (res) {
      // 注册成功 存入用户信息至本地 并跳转到登录界面
      // this.saveUser(res);
      notification.success({
        message: "注册成功，请登录账号"
      });
      this.tabChange(true);
    } else {
      // 注册失败，若为用户已存在，则跳转登录界面
    }
  };

  tabChange = (isLogin) => {
    this.setState({ isLogin });
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
        {isLogin && (
          <div className='login'>
            <Form
              name='login'
              initialValues={{
                remember: true
              }}
              layout='horizontal'
              onFinish={this.onLogin}
              {...defaultFormStyle}
              {...defaultFormConfig}
            >
              <Form.Item
                label='用户名'
                name='userCode'
                rules={[
                  {
                    required: true,
                    message: ERROR_MSG.invalid
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='密码'
                name='password'
                rules={[
                  {
                    required: true,
                    message: ERROR_MSG.invalid
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Row>
                <Button type='primary' htmlType='submit' className='submit-btn'>
                  登录
                </Button>
              </Row>
              {/* <Row align='space-between'>
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
              </Row> */}
            </Form>
          </div>
        )}
        {!isLogin && (
          <div className='register'>
            <Form
              name='register'
              {...defaultFormStyle}
              {...defaultFormConfig}
              initialValues={{
                remember: true
              }}
              onFinish={this.onRegister}
              onFinishFailed={this.onRegisterFailed}
              autoComplete='off'
            >
              <Form.Item
                label='用户名'
                name='userName'
                rules={[
                  {
                    required: true,
                    message: ERROR_MSG.invalid
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='用户代码'
                name='userCode'
                rules={[
                  {
                    required: true,
                    message: ERROR_MSG.invalid
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='密码'
                name='password'
                rules={[
                  {
                    required: true,
                    message: ERROR_MSG.invalid
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Row>
                <Button type='primary' htmlType='submit' className='submit-btn'>
                  立即注册
                </Button>
              </Row>
            </Form>
          </div>
        )}
        <Button
          type='primary'
          htmlType='submit'
          style={{ marginTop: 20 }}
          className='submit-btn'
          onClick={() => this.tabChange(!isLogin)}
        >
          {isLogin ? "无账号去注册" : "已有账号去登录"}
        </Button>
      </div>
    );
  }
}
