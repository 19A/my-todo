import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import { registerApi } from "@/services/index.js";
import { registerApi } from "@/services/index.js";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";

import axios from "axios";
import "./login.css";
const baseURL = "https://login";

/*eslint-disable*/
@inject("store")
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      isLogin: true
    };
  }

  forgetPassword = (values) => {};

  onLogin = async (data) => {
    const res = await registerApi(data);
    if (res) {
      // 注册成功
      // 存入用户信息至本地
    }
  };

  onLoginFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onRegister = (data) => {
    return axios.post(baseURL, data).then((response) => {
      console.log("client ---- register");
    });
  };

  onRegisterFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  tabChange = (key) => {
    this.setState({
      isLogin: key === "login"
    });
  };

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
              name='basic'
              labelCol={{
                span: 8
              }}
              wrapperCol={{
                span: 16
              }}
              initialValues={{
                remember: true
              }}
              onFinish={this.onLogin}
              onFinishFailed={this.onLoginFailed}
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
              name='basic'
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
                name='password'
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
