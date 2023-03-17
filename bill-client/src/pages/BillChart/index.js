import React, { Component } from "react";
import { Card, Table, Modal, Avatar } from "antd";
import Tabs from "@/components/Tabs";
import { PieChartOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import { queryBillListApi } from "@/services";
import defaultAvatar from "@/assets/avatar_pro.png";
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
      pageNum: 1,
      pageSize: 9999
    });
    console.log("res", res);
    if (res) {
      this.setState({ billData: res.data.rows });
    }
  }

  getTableItem = (record) => {
    const { tradeTime, tradeClassify, productDescription, money, remark } =
      record;
    return (
      <div onClick={() => this.goDetail(record)} className='bill-item'>
        <div className='left'>
          {" "}
          <Avatar
            size='large'
            style={{ width: "100%", height: "100%" }}
            src={defaultAvatar}
          />
        </div>
        <div className='right'>
          <div className='desc'>
            <div className='desc-product'>{productDescription}</div>
            <div className='desc-amount'> {money}</div>
          </div>
          <div className='tag'>
            {tradeClassify}
            {remark}
          </div>
          <p className='time'>{tradeTime}</p>
        </div>
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
    const tabs = [
      {
        key: "bill",
        label: `账单`,
        icon: <MoneyCollectOutlined />,
        children: (
          <Table
            className='bill-table'
            showHeader={false}
            columns={columns}
            dataSource={billData}
            pagination={false}
          />
        )
      },
      {
        key: "chart",
        label: `收支分析`,
        icon: <PieChartOutlined />,
        children: <DemoLine />
      }
    ];

    return (
      <div className='bill-chart-container'>
        <Tabs
          className='bill-tabs'
          tabs={tabs}
          activeKey={tabKey}
          onChange={(el) => {
            this.setState({ tabKey: el });
          }}
        />
      </div>
    );
  }
}
