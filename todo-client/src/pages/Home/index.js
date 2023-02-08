/**
 * @ ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐
 * @ │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐
 * @ └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘
 * @ ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐
 * @ │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │
 * @ ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤
 * @ │ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ | \ │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │
 * @ ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │
 * @ │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  │               │ 4 │ 5 │ 6 │   │
 * @ ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤
 * @ │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │
 * @ ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││
 * @ │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│
 * @ └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘
 */

import { inject, observer } from "mobx-react";
import { Table, Button, Tag, Modal, Form, Input, DatePicker } from "antd";
import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
import dayjs from "dayjs";
import { Header, Content } from "@/components/Page";
import { DATETIME_MAX } from "@/utils/constants";
import { nullValueFilter, createPagination } from "@/utils/index";
import {
  queryListApi,
  createItemApi,
  deleteItemApi,
  modifyItemApi
} from "@/services";
import "./index.less";
const FormItem = Form.Item;
const { TextArea } = Input;
// 默认分页配置
const defaultPage = { page: 1, size: 10 };
// 0:待办, 1: 完成, 2:删除, 999:全部
const task = [
  {
    code: "todo",
    name: "待办",
    status: 0,
    color: "geekblue",
    action: [
      {
        code: "edit",
        name: "编辑"
      },
      {
        code: "finish",
        name: "完成",
        color: "green"
      },
      {
        code: "delete",
        name: "删除",
        color: "red"
      }
    ]
  },
  {
    code: "finish",
    status: 1,
    name: "完成",
    color: "green",
    action: [
      {
        code: "edit",
        name: "编辑"
      },
      {
        code: "todo",
        name: "待办",
        color: "geekblue"
      },
      {
        code: "delete",
        name: "删除",
        color: "red"
      }
    ]
  },
  {
    code: "delete",
    name: "已删除",
    status: 2,
    color: "red",
    action: []
  },
  {
    code: "all",
    name: "全部",
    status: 999,
    action: []
  }
];
const modalConfig = {
  width: 760,
  okText: "确定",
  cancelText: "取消"
};

const TaskForm = forwardRef(({ record }, ref) => {
  const formRef = useRef();
  const { title, gmt_expire, content } = record;
  useImperativeHandle(ref, () => {
    return { formRef };
  });
  return (
    <Form
      ref={formRef}
      preserve={false}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={(values) => {
        window.alert("onFinish", JSON.stringify(values));
      }}
    >
      <FormItem
        label='内容标题'
        name='title'
        rules={[{ required: true }]}
        initialValue={title}
      >
        <Input />
      </FormItem>
      <FormItem
        label='截止日期'
        name='gmt_expire'
        rules={[{ required: true }]}
        initialValue={dayjs(gmt_expire)}
      >
        <DatePicker format='YYYY-MM-DD' />
      </FormItem>
      <FormItem
        label='任务内容'
        name='content'
        rules={[{ required: true }]}
        initialValue={content}
      >
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </FormItem>
    </Form>
  );
});

const Home = (props) => {
  const taskFormRef = useRef(null); // task弹框Ref
  const searchInput = useRef(null); // title搜索InputRef
  const [searchAll, setSearchAll] = useState(false); // 查询所有
  const [list, setList] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pagination, setPage] = useState(null);

  useEffect(() => {
    handleQuery();
  }, []);

  const getTaskFormValues = (formEntity) => {
    const values = formEntity.getFieldsValue();
    const { gmt_expire } = values;
    return {
      ...formEntity.getFieldsValue(),
      gmt_expire: gmt_expire.format(DATETIME_MAX)
    };
  };

  // params 字段查询 | 字段排序 | 分页信息[默认 defaultPage]
  // ps: 字段查询 | 字段排序 变动时重置分页
  const handleQuery = ({ params = null, isClear = false, other = {} } = {}) => {
    let query = null;
    const { selectedKeys, field } = other;
    const fieldValue = selectedKeys && selectedKeys[0];
    // 查询条件、排序条件 变更后重置分页参数为默认
    debugger;
    if (isClear) {
      setSortedInfo({});
      setFilteredInfo({});
      setSearchText("");
      setSearchedColumn("");
    } else {
      setSearchText(fieldValue);
      setSearchedColumn(field);
      query = { ...defaultPage, ...params, [field]: fieldValue };
    }
    const queryParams = nullValueFilter(query);
    queryListApi(queryParams).then((res) => {
      const pageInfo = searchAll ? false : createPagination(res.data);
      setList(res.data.content || []);
      setPage(pageInfo);
    });
  };

  const handleTableChange = (pageInfo, filters, sorter) => {
    console.log("Various parameters", pageInfo, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    const { field, order } = sorter;
    const { current: page, pageSize: size } = pageInfo;
    const pageParams = order ? { page: 1, size: 10 } : { page, size };
    const transport = { ascend: "asc", descend: "desc" };
    handleQuery({
      params: {
        ...filters,
        ...pageParams,
        sorter: order ? [field, transport[order]].join(",") : null
      }
    });
  };

  const handleTaskCreate = () => {
    const formProps = {
      record: {},
      ref: taskFormRef
    };
    Modal.confirm({
      ...modalConfig,
      title: "任务新建",
      content: <TaskForm {...formProps} />,
      onOk: async () => {
        // console.log("taskFormRef", taskFormRef);
        const formEntity = taskFormRef.current.formRef.current;
        const validatesRes = await formEntity.validateFields();
        if (!validatesRes) return Promise.reject();
        const res = await createItemApi(getTaskFormValues(formEntity));
        if (!res) return Promise.reject();
        handleQuery();
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  // type: 标签类型 task | action
  const tagsRender = (type, record) => {
    const taskInfo = task.filter((i) => i.status === record.status);
    const actionInfo = task.find((i) => i.status === record.status).action;
    const tags = type === "task" ? taskInfo : actionInfo;
    return tags.map(({ code, color, name }) => {
      return (
        <Tag
          key={code}
          color={color}
          onClick={() => actionRender(code, record)}
        >
          {name}
        </Tag>
      );
    });
  };

  const actionRender = async (code, record) => {
    const formProps = {
      record,
      ref: (e) => (taskFormRef.current = e)
    };
    switch (code) {
      case "edit":
        Modal.confirm({
          ...modalConfig,
          title: "任务编辑",
          content: <TaskForm {...formProps} />,
          onOk: async () => {
            console.log("taskFormRef", taskFormRef);
            const formEntity = taskFormRef.current.formRef.current;
            const validatesRes = await formEntity.validateFields();
            if (!validatesRes) return Promise.reject();
            const values = getTaskFormValues(formEntity);
            const res = await modifyItemApi({ ...record, ...values });
            if (!res) return Promise.reject();
            //任务创建成功,重新查询
            handleQuery();
          },
          onCancel() {
            console.log("Cancel");
          }
        });
        break;
      case "todo":
        const updateRes = await modifyItemApi({ ...record, status: 0 });
        if (updateRes) {
          handleQuery();
        }
        break;
      case "finish":
        const finishRes = await modifyItemApi({ ...record, status: 1 });
        if (finishRes) {
          handleQuery();
        }
        break;
      case "delete":
        const deleteRes = await deleteItemApi({ ...record });
        if (deleteRes) {
          handleQuery();
        }
        break;
      default:
        break;
    }
  };

  const taskFailedRender = (val, { status }) => {
    return dayjs(val).diff(dayjs()) < 0 && status !== 1 ? (
      <span style={{ color: "red" }}>{val}</span>
    ) : (
      val
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleQuery({ other: { selectedKeys, confirm, field: dataIndex } })
          }
          style={{
            marginBottom: 8,
            display: "block"
          }}
        />
      </div>
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    }
  });

  const columns = [
    {
      title: "序号",
      dataIndex: "seq",
      key: "seq",
      render: function () {
        return arguments[2] + 1;
      }
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title")
    },
    {
      title: "任务内容",
      dataIndex: "content",
      key: "content",
      width: 200
    },
    {
      title: "任务截止日期",
      dataIndex: "gmt_expire",
      key: "gmt_expire",
      render: (val, record) => taskFailedRender(val, record)
    },
    {
      title: "任务状态",
      dataIndex: "status",
      key: "status",
      filters: task.map((i) => ({ text: i.name, value: i.status })),
      filteredValue: filteredInfo.status,
      onFilter: (value, record) => {
        const cond =
          value !== 999 && typeof value === "number"
            ? record.status === value
            : true;
        return cond;
      },
      render: (_, record) => tagsRender("task", record)
    },
    {
      title: "最后更新日期",
      dataIndex: "gmt_update",
      key: "gmt_update",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "gmt_update" ? sortedInfo.order : null
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => tagsRender("action", record)
    }
  ];

  return (
    <Fragment>
      <Header />
      <Content>
        <div style={{ marginBottom: 16 }}>
          <Button
            type='primary'
            onClick={() => handleQuery()}
            style={{ marginRight: 16 }}
          >
            查询
          </Button>
          {/* <Button
            type='primary'
            onClick={() => {
              setSearchAll(true);
              handleQuery({ isClear: true });
            }}
            style={{ marginRight: 16 }}
          >
            查询所有
          </Button> */}
          <Button type='default' onClick={handleTaskCreate}>
            新建
          </Button>
          <a href='http://1.117.165.71:8889' target='_blank' rel='noreferrer'>
            外网
          </a>
        </div>
        <p>token: {props.store.token}</p>
        <Table
          columns={columns}
          dataSource={list}
          pagination={pagination}
          onChange={handleTableChange}
          rowClassName='todo-table-row'
        />
      </Content>
    </Fragment>
  );
};
export default inject("store")(observer(Home));
