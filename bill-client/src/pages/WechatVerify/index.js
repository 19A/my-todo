import React, { Fragment, useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";

import qs from "qs";
import { withRouter } from "react-router-dom";

import { wechatUrlApi, wechatVerifyApi } from "../../services/index";

const WechatVerify = (props) => {
  const {
    // history,
    location: { search }
  } = props;
  const searchObj = qs.parse(search.substr(1));

  // useEffect(() => {
  //   // 跳转后端指定页面
  //   wechatUrlApi().then((res) => {
  //     if(res.data){
  //   history.push()

  //     }
  //   });
  // }, []);
  const onFinish = async (values) => {
    const { id: billTaskId } = searchObj;
    console.log("Success:", values, "props", props, "searchObj", searchObj);
    if (values?.unzipPassword?.length === 6) {
      const res = await wechatVerifyApi({
        ...values,
        billTaskId
      });
      if (res) {
        notification.success({
          description: "开始同步"
        });
      }
    } else {
      alert("请输入有效数据");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        width: "100%",
        height: "100%",
        backgroundImage:
          "url(https://img1.baidu.com/it/u=4050062314,1116360005&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500)"
      }}
    >
      <Form
        name='basic'
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 600
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='输入微信解压码, 同步微信账单'
          name='unzipPassword'
          rules={[
            {
              required: true,
              message: "请输入合法的微信解压码"
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(WechatVerify);
