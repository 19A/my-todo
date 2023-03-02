import React, { useState, useEffect, useCallback } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import { Line } from "@ant-design/plots";
import Tabs from "@/components/Tabs";
import { queryTotalApi } from "@/services";

import "./index.less";

const dateFormat = "YYYY/MM/DD";
const weekFormat = "MM/DD";
const monthFormat = "YYYY-MM";
const yearFormat = "YYYY";

const Analysis = () => {
  const [stage, setStage] = useState("month");
  const [analysis, setAnalysis] = useState("expense"); // Income
  const [month, setMonth] = useState(dayjs(new Date()));
  const [year, setYear] = useState(dayjs(new Date()));
  const [total, setTotal] = useState({
    children: [],
    regardlessIncomeExpenditure: 0,
    totalIncome: 0,
    totalPay: 0,
    userName: ""
  });

  useEffect(() => {
    queryTotal();
  }, [stage, month, year]);

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
  // const queryTotal = async() => {
  //   const res = await queryTotalApi({
  //     statisticType: stage === "month" ? 1 : 2,
  //     statisticDate:
  //       stage === "month"
  //         ? dayjs(month).format(monthFormat)
  //         : dayjs(year).format(yearFormat)
  //   });
  //   if (res.data) {
  //     setTotal(res.data);
  //   }
  // };

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
    console.log("time", time, "str", str, "stage", stage);
    if (stage === "month") {
      setMonth(time);
    } else {
      setYear(time);
    }
  };
  // console.log('stage',stage);
  // console.log('analysis',analysis);
  const getTabs = () => {
    const getItem = (type) => {
      return (
        <>
          <div className='statistic'>
            <div className='total'>
              <div className='wrapper'>
                <span className='word'>
                  {type === "month" ? "月支出" : "年支出"}
                </span>
                <span className='money'>{total.totalPay || 0} 元</span>
                <span className='calc'>共100笔</span>
              </div>
              <div className='wrapper'>
                <span className='word'>
                  {type === "month" ? "月收入" : "年收入"}
                </span>
                <span className='money'>{total.totalIncome || 0} 元</span>
                <span className='calc'>共0笔</span>
              </div>
              <div className='wrapper'>
                <span className='word'>
                  {type === "month" ? "不计支出" : "不计支出"}
                </span>
                <span className='money'>{total.regardlessIncomeExpenditure || 0} 元</span>
                <span className='calc'>共0笔</span>
              </div>
            </div>
            <div className='date'>
                <DatePicker
                  value={type === "month" ? month : year}
                  picker={type === "month" ? "month" : "year"}
                  onChange={switchDate}
                />
            </div>
          </div>
          <div>
            <Tabs
              className={"analysis-tabs"}
              activeKey={analysis}
              tabs={getAnalysisTab()}
              onChange={setAnalysis}
            />
          </div>
        </>
      );
    };
    return [
      {
        key: "month",
        label: "月度xxx",
        children: getItem("month")
      },
      {
        key: "year",
        label: "年度xxxx",
        children: getItem("year")
      }
    ];
  };
  const getAnalysisTab = () => {
    const getItem = () => {
      // return <Line {...config} />;
      return <div/>;
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
          tabs={getTabs()}
          onChange={setStage}
        />
      </>
    </>
  );
};

export default Analysis;
