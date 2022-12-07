import React, { Component } from "react";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";

import axios from "axios";
import style from "login.less";
const baseURL = "https://login";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  register = (data) => {
    return axios.post(baseURL, data).then((response) => {
      console.log("client ---- register");
    });
  };

  onFinish = async (data) => {
    const res = await this.register(data);
    if (res) {
      // 注册成功
    }
    // console.log("Success:", values);
  };

  forgetPassword = (values) => {};

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div className={style["login-wrapper"]}>
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
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
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
        {/* <div className='register'>
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
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
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
        </div> */}
      </div>
    );
  }
}
