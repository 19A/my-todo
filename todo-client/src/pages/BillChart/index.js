import React, { Component } from "react";
import { Space, Card, Table, Modal } from "antd";
// import { data } from "@/mock/chart.js";
import { queryBillListApi } from "@/services";
import DemoLine from "./chart";

import "./index.less";
export default class BillChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billData: []
    };
  }
  componentDidMount() {
    this.queryBillList();
  }

  async queryBillList() {
    const res = await queryBillListApi();
    console.log("res", res);
    if (res) {
      this.setState({ billData: res.data.content });
    }
  }

  getTableItem = (record) => {
    const {
      bill_id,
      trade_time,
      trade_classify,
      trader,
      trader_account,
      product_description,
      trade_type,
      money,
      payment_method,
      trade_state,
      merchant_order_number,
      remark,
      sys_user_id,
      del_flag,
      create_time,
      update_time,
      bill_type
    } = record;
    return (
      <div onClick={() => this.goDetail(record)} className='bill-item'>
        <div className='desc'>
          <div className='desc-product'>{product_description}</div>
          <div className='desc-amount'> {money}</div>
        </div>
        <div className='tag'>
          {trade_classify}
          {remark}
        </div>
        {/* <p>{trade_state}</p> */}
        <p className='time'>{create_time}</p>
      </div>
    );
  };

  getLineItem = ({ label, text }) => (
    <div className='li'>
      <div className='label'>{label}</div>
      <div className='text'>
        <p>{text}</p>
      </div>
    </div>
  );

  getCardItem = (record) => {
    const {
      bill_id,
      trade_time,
      trade_classify,
      trader,
      trader_account,
      product_description,
      trade_type,
      money,
      payment_method,
      trade_state,
      merchant_order_number,
      remark,
      sys_user_id,
      del_flag,
      create_time,
      update_time,
      bill_type
    } = record;
    return (
      <Card size='small' bordered={false}>
        <div className='ul'>
          {Object.keys(record).map((i) =>
            this.getLineItem({
              label: i,
              text: record[i]
            })
          )}
          {/* <div className='li'>
            <div className='label'></div>
            <div className='text'>
              <p>{bill_id}</p>
            </div>
          </div> */}
        </div>
        {/* <p>{bill_id}</p>
        <p>{trade_time}</p>
        <p>{trade_classify}</p>
        <p>{trader}</p>
        <p>{trader_account}</p>
        <p>{product_description}</p>
        <p>{trade_type}</p>
        <p>{money}</p>
        <p>{trade_state}</p>
        <p>{payment_method}</p>
        <p>{merchant_order_number}</p>
        <p>{remark}</p>
        <p>{sys_user_id}</p>
        <p>{del_flag}</p>
        <p>{create_time}</p>
        <p>{update_time}</p>
        <p>{bill_type}</p> */}
      </Card>
    );
  };

  goDetail = (record) => {
    Modal.info({
      title: "账单详情",
      content: this.getCardItem(record),
      onOk() {}
    });
  };

  render() {
    const { billData } = this.state;
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
    // const data = [
    //   {
    //     tradeTime: "2023-02-23 21:23:33",
    //     tradeCategoryName: "餐饮",
    //     tradeCategoryCode: "eating",
    //     tradeParter: "2023-02-23 21:23:33",
    //     tradeAccount: "132423421xxxxx1234134",
    //     tradeFood: "合肥黄山",
    //     isIncome: true,
    //     isIncomeMeaning: "收入",
    //     amount: 1.19,
    //     payeeName: "余额宝",
    //     tradeStatusMeaning: "交易成功",
    //     tradeStatus: "SUCEED",
    //     tradeOrderNum: "2023022313",
    //     merchantOrderNum: "1589234234234", //
    //     remark: "备注1"
    //   },
    //   {
    //     tradeTime: "2023-02-23 21:23:33",
    //     tradeCategoryName: "餐饮",
    //     tradeCategoryCode: "eating",
    //     tradeParter: "2023-02-23 21:23:33",
    //     tradeAccount: "132423421xxxxx1234134",
    //     tradeFood: "合肥黄山2",
    //     isIncome: true,
    //     isIncomeMeaning: "收入",
    //     amount: 1.19,
    //     payeeName: "余额宝",
    //     tradeStatusMeaning: "交易成功",
    //     tradeStatus: "SUCEED",
    //     tradeOrderNum: "2023022313",
    //     merchantOrderNum: "1589234234234", //
    //     remark: "备注1"
    //   }
    // ];
    return (
      <div className='bill-chart-container'>
        <Table
          className='bill-table'
          showHeader={false}
          columns={columns}
          dataSource={billData}
          pagination={true}
        />
        <Card>
          <DemoLine />
        </Card>
      </div>
    );
  }
}
