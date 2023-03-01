import React, { Component } from "react";
import { Space, Card, Table, Modal } from "antd";
import Tabs from "@/components/Tabs";
// import { data } from "@/mock/chart.js";
import { queryBillListApi } from "@/services";
import DemoLine from "./chart";

import "./index.less";
export default class BillChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billData: [],
      tabKey: "bill"
    };
  }
  componentDidMount() {
    this.queryBillList();
  }

  async queryBillList() {
    const res = await queryBillListApi({
      pageNum: 0,
      pageSize: 10
    });
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
    return (
      <Card size='small' bordered={false}>
        <div className='ul'>
          {Object.keys(record).map((i) =>
            this.getLineItem({
              label: i,
              text: record[i]
            })
          )}
        </div>
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
    const { billData, tabKey } = this.state;
    const columns = [
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
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
    const tabs = [
      {
        key: "bill",
        label: `账单`,
        children: (
          <Table
            className='bill-table'
            showHeader={false}
            columns={columns}
            dataSource={billData}
            pagination={true}
          />
        )
      },
      {
        key: "chart",
        label: `收支分析`,
        children: (
          <Card>
            <DemoLine />
          </Card>
        )
      }
    ];

    return (
      <div className='bill-chart-container'>
        <Tabs
          activeKey={tabKey}
          tabs={tabs}
          className='tabs'
          onChange={(e) => {
            this.setState({ tabKey: e });
          }}
        />
      </div>
    );
  }
}
