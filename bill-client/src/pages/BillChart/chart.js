import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DatePicker} from 'antd';
import dayjs from 'dayjs';
import { Line } from "@ant-design/plots";
import Tabs from "@/components/Tabs";
import { queryTotalApi } from '@/services'

import './less';

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'yyyy-MM';

const Analysis = () => {
  const [stage, setStage] = useState('month');
  const [analysis, setAnalysis]  = useState('expense') // Income
  const [month,setMonth] = useState();
  const [year,setYear] = useState();
  const [total, setTotal] = useState({
    children: [],
    regardlessIncomeExpenditure: 0,
    totalIncome: 0,
    totalPay: 0,
    userName:""
  }); 

  useEffect(() => {
    queryTotal();
  }, [])

  const queryTotal = async () => {
     const res = await queryTotalApi({
      statisticType:stage === 'month'? 1 : 2,
      statisticDate:stage === 'month'? month : year
    })
    if(res.data){
      setTotal(res.data);
    }
  }

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
  const switchDate = (time) => {
    console.log('time',time,'stage',stage);
  }
  // console.log('stage',stage);
  // console.log('analysis',analysis);
  const getTabs = () => {
    const getItem = (type) => {
      return (
        <>
          <div className='total'>
            <div className='wrapper'>
              <span className='word'>{type==='month'?'月支出':'年支出'}</span>
              <span className='money'>{total.totalPay}</span>
              <span className='calc'>共100笔</span>
            </div>
            <div className='wrapper'>
              <span className='word'>{type==='month'?'年收入':'年收入'}</span>
              <span className='money'>{total.totalIncome}</span>
              <span className='calc'>共0笔</span>
            </div>
          </div>
          <div className='date'>
            {/* {<DatePicker picker={type==='month'?'month':'year'} />} */}
            {<DatePicker value={dayjs(dayjs(), monthFormat)} picker={'month'} onChange={this.switchDate}/>}
          </div>
          <div>
        <Tabs   
          className={'analysis-tabs'}
          activeKey={analysis}
          tabs={getAnalysisTab()}
          onChange={setAnalysis}/>
      </div>
        </>
      )
    }
   return [
      {
        key:'month',
        label:'月度xxx',
        children: getItem('month')
      },
      {
        key:'year',
        label:'年度xxxx',
        children: getItem('year')
      },
      
    ]
  }
  const getAnalysisTab = () => {
    const getItem = () => {
        return < Line {
            ...config
          }
          />;
    }
    return [
      {
        key:'expense',
        label:'支出分析',
        children: getItem('expense')
      },
      {
        key:'income',
        label:'收入分析',
        children: getItem('income')
      },
      
    ]
  }
  return <>
 <>
  <Tabs
    className={'stage-tabs'}
    activeKey={stage}
    tabs={getTabs()}
    onChange={(a)=>{
      setStage(a);
      queryTotal()
    }}
  />
  
 </>
  </>
};

export default Analysis;

