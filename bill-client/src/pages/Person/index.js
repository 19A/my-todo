import React, {
  Fragment,
  useState,
  useRef,
  useCallback,
  useEffect
} from "react";
import {
  PlusOutlined,
  LoadingOutlined,
  UploadOutlined
} from "@ant-design/icons";
import {
  message,
  Upload,
  Card,
  Avatar,
  InputNumber,
  Button,
  Input,
  Modal,
  Form
} from "antd";

import { getUserInfo, getUserToken } from "@/utils";
import { queryUserApi, updateUserApi } from "@/services";
import defaultAvatar from "@/assets/avatar_pro.png";
import "./index.less";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const EditUser = (props) => {
  const formRef = useRef();
  const { children, userInfo } = props;
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const editUser = useCallback(async () => {
    console.log("form", formRef);
    const { submit, getValidates } = formRef.current;
    alert("确认修改");
    const res = await updateUserApi(userInfo);
  }, [formRef.current]);

  const editModal = () => {
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!"
      },
      number: {
        range: "${label} must be between ${min} and ${max}"
      }
    };

    Modal.confirm({
      maskClosable: true,
      title: "编辑",
      content: (
        <Form
          {...layout}
          ref={(node) => {
            formRef.current = node;
          }}
          name='user-from'
          onFinish={editUser}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item name='upload' label='头像' valuePropName='fileList'>
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt='avatar'
                  style={{
                    width: "100%"
                  }}
                />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div
                    style={{
                      marginTop: 8
                    }}
                  >
                    Upload
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>
          {/* <Form.Item
            name={["user", "name"]}
            label='姓名'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "phone"]}
            label='联系方式'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label='邮箱'
            rules={[{ type: "email" }]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      )
      // onOk: editUser
    });
  };
  return <div onClick={editModal}>{children}</div>;
};

const Person = () => {
  const token = getUserToken();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    avator: defaultAvatar,
    email: "",
    emailKey: "",
    idSixNumber: "",
    phone: "",
    userName: ""
  });

  const formRef = useRef();
  // const { children, userInfo } = props;
  const handleChange = (info) => {
    const { sysUserId: userId } = getUserInfo();
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      const url = info.file?.response?.data;
      console.log('url',url);
      if(!url) return;
      // {"sysUserId":"cf06fa1f-aaf8-450f-b432-8b00a28e4ec3","sysUserCode":"zhubiao","sysUserName":"朱彪"}
      updateUserApi({
        userId,
        useCode: "zhubiao",
        // userId: "cf06fa1f-aaf8-450f-b432-8b00a28e4ec3"
        userName: "朱彪",
        avator: url
      }).then((res) => {
        // if(res){}
        queryUser();
        setLoading(false)
      });
      // getBase64(info.file.originFileObj, (url) => {
      //   setLoading(false);
     
      //   // setImageUrl(url);
      // });
    }
  };

  useEffect(() => {
    queryUser();
  }, []);

  const queryUser = () => {
    const { sysUserId: userId } = getUserInfo();
    // console.log("userId", userId);
    queryUserApi(userId).then((res) => {
      if (res.data) {
        setUser(res.data);
      }
    });
  }

  return (
    <div className='person-container'>
      <Card>
        <div className='item'>
          <div className='label'>头像</div>
          <div className='text'>
            {/* <Avatar src={user.avator || defaultAvatar} /> */}
            <Upload
              name='file'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              headers={{token, Authorization:token}}
              action='http://1.117.165.71/x-api/file/uploadFile'
            >
              {user.avator ? (
                // <img
                //   src={user.avator}
                //   alt='avatar'
                //   style={{
                //     width: "100%"
                //   }}
                // />
                <Avatar     
                  size='large'
                  style={{width: "100%",height:'100%'}}
                  src={user.avator || defaultAvatar}
                  />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div
                    style={{
                      marginTop: 8
                    }}
                  >
                    Upload
                  </div>
                </div>
              )}
            </Upload>
          </div>
        </div>
        <div className='item'>
          <div className='label'>姓名</div>
          <div className='text'>{user.userName}</div>
        </div>
        <div className='item'>
          <div className='label'>联系方式</div>
          <div className='text'>{user.phone}</div>
        </div>
        <div className='item'>
          <div className='label'>邮箱</div>
          <div className='text'>{user.email}</div>
        </div>
        {/* <div className='item'>
          <div className='label'>账单是否同步</div>
          <div className='text'>是</div>
        </div> */}
      </Card>
    </div>
  );
};

export default Person;
