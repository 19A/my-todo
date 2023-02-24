import React, { Component } from "react";
import { Space, Card, Table } from "antd";

export default class BillChart extends Component {
  getTableItem = (record) => {
    const { tradeCategoryName, payeeName, amount, tradeTime, remark } = record;
    return (
      <Card
        size='small'
        title='Small size card'
        extra={<a href='#'>More</a>}
        style={{ width: 300 }}
      >
        <p>{payeeName}</p>
        <p>{tradeCategoryName}</p>
        <p>{amount}</p>
        <p>{tradeTime}</p>
        <p>{remark}</p>
      </Card>
    );
  };
  render() {
    const columns = [
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
          // console.log("recordProps", a, b, c);
          // const { record } = recordProps;
          return this.getTableItem(record);
        }
      }
    ];
    const data = [
      {
        tradeTime: "2023-02-23 21:23:33",
        tradeCategoryName: "餐饮",
        tradeCategoryCode: "eating",
        tradeParter: "2023-02-23 21:23:33",
        tradeAccount: "132423421xxxxx1234134",
        tradeFood: "合肥黄山",
        isIncome: true,
        isIncomeMeaning: "收入",
        amount: 1.19,
        payeeName: "余额宝",
        tradeStatusMeaning: "交易成功",
        tradeStatus: "SUCEED",
        tradeOrderNum: "2023022313",
        merchantOrderNum: "1589234234234", //
        remark: "备注1"
      },
      {
        tradeTime: "2023-02-23 21:23:33",
        tradeCategoryName: "餐饮",
        tradeCategoryCode: "eating",
        tradeParter: "2023-02-23 21:23:33",
        tradeAccount: "132423421xxxxx1234134",
        tradeFood: "合肥黄山2",
        isIncome: true,
        isIncomeMeaning: "收入",
        amount: 1.19,
        payeeName: "余额宝",
        tradeStatusMeaning: "交易成功",
        tradeStatus: "SUCEED",
        tradeOrderNum: "2023022313",
        merchantOrderNum: "1589234234234", //
        remark: "备注1"
      }
    ];
    return <Table showHeader={false} columns={columns} dataSource={data} />;
  }
}
