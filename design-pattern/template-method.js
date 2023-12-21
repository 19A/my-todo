// https://pattern.windliang.wang/posts/%E5%89%8D%E7%AB%AF%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E7%B3%BB%E5%88%97-%E6%A8%A1%E7%89%88%E6%A8%A1%E5%BC%8F.html
// 模板方法模式：抽象父类提供骨架方法，由子类自行实现具体的抽象方法

// 解决问题：

// 不用会？

// 原则？开放关闭原则

// 已经应用场景
// React.Component
// 业务组件的实现等

// 示例场景
// 优化以下代码
import React from "react";
import { getDataMock } from "./mock";

export default function UserList() {
  // 使用三个 state 分别保存用户列表，loading 状态和错误状态
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // 定义获取用户的回调函数
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getDataMock();
      // 请求成功后将用户数据放入 state
      setUsers(res.data);
    } catch (err) {
      // 请求失败将错误状态放入 state
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className='user-list'>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Show Users"}
      </button>
      {error && <div style={{ color: "red" }}>Failed: {String(error)}</div>}
      <br />
      <ul>
        {users &&
          users.length > 0 &&
          users.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}

// => 封装重复的处理过程 展示loading、请求数据、展示数据/捕获异常、停止loading
import React, { useCallback, useState } from 'react';
import { getDataMock } from "./mock";

const useGetDataHook = (fetchApi) => {
    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const execute = useCallback(async () => {
        // 初始化执行
        setData(null);
        setError(null);
        setLoading(true);
        try {
            const res = await fetchApi()
            setData(res);  
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    },[fetchApi]);
    return {
        data,
        loading,
        error,
        execute
    }
}

export default function UserList() {
  const { execute:fetchUsers, data: users, loading, error} = useGetDataHook(
    async ()=>{
        const res = await getDataMock();
        return res.data;
    }
  )

  return (
    <div className='user-list'>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Show Users"}
      </button>
      {error && <div style={{ color: "red" }}>Failed: {String(error)}</div>}
      <br />
      <ul>
        {users &&
          users.length > 0 &&
          users.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
