import React, { useState, useEffect, useCallback } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import { Line } from "@ant-design/plots";
import Tabs from "@/components/Tabs";
import { queryTotalApi } from "@/services";

import "./index.less";

const monthFormat = "YYYY-MM";
const yearFormat = "YYYY";

const Analysis = () => {
  const [stage, setStage] = useState("month");
  const [toggle, setToggle] = useState(true); // 默认收起
  const [analysis, setAnalysis] = useState("expense"); // Income
  const [month, setMonth] = useState(dayjs(new Date()));
  const [year, setYear] = useState(dayjs(new Date()));
  const [total, setTotal] = useState({
    children: [],
    regardlessIncomeExpenditure: 0,
    totalIncome: 0,
    totalPay: 0,
    regardlessIncomeExpenditureCount: 0,
    totalIncomeCount: 0,
    totalPayCount: 0,
    userName: ""
  });

  useEffect(() => {
    queryTotal();
  }, []);

  const queryTotal = useCallback(async () => {
    const res = await queryTotalApi({
      statisticType: stage === "month" ? 1 : 2,
      statisticDate:
        stage === "month"
          ? dayjs(month).format(monthFormat)
          : dayjs(year).format(yearFormat)
    });
    if (res.data) {
      setTotal(res.data);
    }
  }, [month, year, stage]);

  const data = [
    {
      year: "1991",
      value: 3
    },
    {
      year: "1992",
      value: 4
    },
    {
      year: "1993",
      value: 3.5
    },
    {
      year: "1994",
      value: 5
    },
    {
      year: "1995",
      value: 4.9
    },
    {
      year: "1996",
      value: 6
    },
    {
      year: "1997",
      value: 7
    },
    {
      year: "1998",
      value: 9
    },
    {
      year: "1999",
      value: 13
    }
  ];
  const config = {
    data,
    xField: "year",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "circle", // 连接点类型
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2
      }
    },
    tooltip: {
      showMarkers: false
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red"
        }
      }
    },
    interactions: [
      {
        type: "marker-active"
      }
    ]
  };
  const switchDate = (time, str) => {
    if (stage === "month") {
      setMonth(time);
    } else {
      setYear(time);
    }
  };
  console.log("toggle", toggle);
  const getTabs = (info, isChild) => {
    const getItem = (type) => {
      return (
        <>
          <div className='statistic'>
            <div className='total'>
              <div className='wrapper'>
                <span className='word'>
                  {type === "month" ? "月支出" : "年支出"}
                </span>
                <span className='money'>
                  <span className='money-num'>{info.totalPay || 0}</span>
                  <span className='money-unit'>元</span>
                </span>
                <span className='calc'>共{info.totalPayCount || 0}笔</span>
              </div>
              <div className='wrapper'>
                <span className='word'>
                  {type === "month" ? "月收入" : "年收入"}
                </span>
                <span className='money'>
                  <span className='money-num'>{info.totalIncome || 0}</span>
                  <span className='money-unit'>元</span>
                </span>
                <span className='calc'>共{info.totalIncomeCount || 0}笔</span>
              </div>
              <div className='wrapper'>
                <span className='word'>
                  {type === "month" ? "不计支出" : "不计支出"}
                </span>
                <span className='money'>
                  <span className='money-num'>
                    {info.regardlessIncomeExpenditure || 0}
                  </span>
                  <span className='money-unit'>元</span>
                </span>
                <span className='calc'>
                  共{info.regardlessIncomeExpenditureCount || 0}笔
                </span>
              </div>
            </div>
            {isChild ? (
              <div className='date associate-user'>{info.userName}</div>
            ) : (
              <div className='date'>
                <DatePicker
                  value={type === "month" ? month : year}
                  picker={type === "month" ? "month" : "year"}
                  onChange={switchDate}
                />
              </div>
            )}
          </div>
          {!isChild && (
            <div>
              <Tabs
                className={"analysis-tabs"}
                activeKey={analysis}
                tabs={getAnalysisTab()}
                onChange={setAnalysis}
              />
            </div>
          )}
        </>
      );
    };
    return [
      {
        key: "month",
        label: "月度",
        children: getItem("month")
      },
      {
        key: "year",
        label: "年度",
        children: getItem("year")
      }
    ];
  };
  const getAnalysisTab = () => {
    const getItem = () => {
      return (
        <div style={{ display: "none" }}>
          <Line {...config} />;
        </div>
      );
    };
    return [
      {
        key: "expense",
        label: "支出分析",
        children: getItem("expense")
      },
      {
        key: "income",
        label: "收入分析",
        children: getItem("income")
      }
    ];
  };
  return (
    <>
      <>
        <Tabs
          className={"stage-tabs"}
          activeKey={stage}
          tabs={getTabs(total)}
          onChange={setStage}
        />

        {!!total.children?.length && (
          <div className='associate-container'>
            <div className='associate-head' onClick={() => setToggle(!toggle)}>
              {toggle ? "收起关联单据" : "查看关联单据"}
            </div>
            <div
              className={`associate-body ${toggle ? "slide-down" : "slide-up"}`}
            >
              {(total.children || []).map((i) => (
                <Tabs
                  className={"stage-tabs"}
                  activeKey={stage}
                  tabs={getTabs(i, true)}
                  onChange={setStage}
                />
              ))}
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Analysis;
