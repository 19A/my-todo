import React, { Fragment, useEffect, useState } from "react";
import { Form, Input } from "antd";

import qs from "qs";
import { withRouter } from 'react-router-dom';

import { wechatVerifyApi } from "../../services/index"   

const WechatVerify = (props) => {
  const { location:{search} } = props;
  const searchObj = qs.parse(search.substr(1));
  const onFinish = async (values) => {
    console.log('Success:', values,'props',props,'searchObj',searchObj);
    if(values?.verifyCode?.length === 6){
      const res = await wechatVerifyApi(values);
    }else{
      alert("请输入有效数据")
    }
  };

  return  (  
  <div style={{padding:'10px'}}>
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="身份证后六位"
      name="verifyCode"
      rules={[
        {
          required: true,
          message: '请输入身份证后六位',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
  </div>
  )
};

export default withRouter(WechatVerify);
