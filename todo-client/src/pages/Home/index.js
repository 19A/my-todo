import { inject, observer } from "mobx-react";
import { Table, Space, Tag, notification } from "antd";
import React, { Fragment, useEffect, useState } from "react";

import { Header, Content } from "@/components/Page";
// import { notification } from "@/components/utils";
import { queryListApi, createItemApi, deleteItemApi } from "@/services";

const mock = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
const Home = (props) => {
  const [list, setList] = useState(mock);
  const queryList = () => {
    queryListApi()
      .then((res) => setList(res.content || []))
      .catch((err) =>
        notification.error({
          placement: "bottomRight",
          message: "请求报错",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification."
        })
      );
  };
  useEffect(() => {
    queryList();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <a>添加</a>
        </Space>
      )
    }
  ];

  return (
    <Fragment>
      <Header />
      <p>globalToken: {props.store.globalToken}</p>
      <Content>
        <Table columns={columns} dataSource={list} />
      </Content>
    </Fragment>
  );
};
export default inject("store")(observer(Home));
