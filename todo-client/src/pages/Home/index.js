import { inject, observer } from "mobx-react";
import {
  Table,
  Button,
  Space,
  Tag,
  notification,
  Modal,
  Form,
  Input,
  DatePicker
} from "antd";
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
// import { notification } from "@/components/utils";
import {
  queryListApi,
  createItemApi,
  deleteItemApi,
  modifyItemApi
} from "@/services";
import "./index.less";
const FormItem = Form.Item;
const { TextArea } = Input;
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
  // const formE = Form.useForm();
  const { title, gmt_expire = new Date(), content } = record;
  useImperativeHandle(ref, () => {
    return { formRef };
  });
  console.log("record", record);
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
        initialValue={dayjs(gmt_expire, "YYYY-MM-DD")}
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
  const [list, setList] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const taskFormRef = useRef();

  const queryList = () => {
    queryListApi().then((res) => {
      debugger;
      setList(res.data.content || []);
    });
    // .catch((err) =>
    //   notification.error({
    //     placement: "bottomRight",
    //     message: "请求报错",
    //     description:
    //       "This is the content of the notification. This is the content of the notification. This is the content of the notification."
    //   })
    // );
  };

  const getValues = (formEntity) => {
    const values = formEntity.getFieldsValue();
    const { gmt_expire } = values;
    const a = gmt_expire.format("YYYY-MM-DD HH:mm:ss");
    debugger;
    return {
      ...formEntity.getFieldsValue(),
      // gmt_expire: dateFormat("YYYY-MM-DD HH:mm:ss", new Date(gmt_expire))
      gmt_expire: gmt_expire.format("YYYY-MM-DD HH:mm:ss")
    };
  };
  const createItem = () => {
    const formProps = {
      record: {},
      ref: taskFormRef
      // ref: (e) => (taskFormRef.current = e)
    };
    Modal.confirm({
      ...modalConfig,
      title: "任务新建",
      content: <TaskForm {...formProps} />,
      onOk: async () => {
        console.log("taskFormRef", taskFormRef);
        const formEntity = taskFormRef.current.formRef.current;
        const validatesRes = await formEntity.validateFields();
        if (!validatesRes) return Promise.reject();
        const res = await createItemApi(getValues(formEntity));
        if (!res) return Promise.reject();
        queryList();
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  useEffect(() => {
    queryList();
  }, []);

  // type: 标签类型 task | action
  const getTags = (type, record) => {
    const taskInfo = task.filter((i) => i.status === record.status);
    const actionInfo = task.find((i) => i.status === record.status).action;
    const tags = type === "task" ? taskInfo : actionInfo;
    return tags.map(({ code, color, name }) => {
      return (
        <Tag key={code} color={color} onClick={() => handleTask(code, record)}>
          {name}
        </Tag>
      );
    });
  };

  const handleTask = async (code, record) => {
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
            const values = getValues(formEntity);
            const res = await modifyItemApi({ ...record, ...values });
            if (!res) return Promise.reject();
            //任务创建成功,重新查询
            queryList();
          },
          onCancel() {
            console.log("Cancel");
          }
        });
        break;
      case "todo":
        const updateRes = await modifyItemApi({ ...record, status: 0 });
        if (updateRes) {
          queryList();
        }
        break;
      case "finish":
        const finishRes = await modifyItemApi({ ...record, status: 1 });
        if (finishRes) {
          queryList();
        }
        break;
      case "delete":
        const deleteRes = await deleteItemApi({ ...record });
        if (deleteRes) {
          queryList();
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (page, filters, sorter) => {
    console.log("Various parameters", page, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

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
      key: "title"
    },
    {
      title: "任务内容",
      dataIndex: "content",
      key: "content"
    },
    {
      title: "任务截止日期",
      dataIndex: "gmt_expire",
      key: "gmt_expire"
    },

    {
      title: "任务状态",
      dataIndex: "status",
      key: "status",
      filters: task.map((i) => ({ text: i.name, value: i.status })),
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => {
        const cond =
          value !== 999 && typeof value === "number"
            ? record.status === value
            : true;
        return cond;
      },
      render: (_, record) => getTags("task", record)
    },
    {
      title: "最后更新日期",
      dataIndex: "gmt_update",
      key: "gmt_update",
      sorter: (a, b) => (dayjs(a).diff(dayjs(b)) < 0 ? -1 : 1),
      sortOrder: sortedInfo.columnKey === "gmt_update" ? sortedInfo.order : null
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => getTags("action", record)
    }
  ];

  return (
    <Fragment>
      <Header />
      <Content>
        <div style={{ marginBottom: 16 }}>
          <Button
            type='primary'
            onClick={queryList}
            style={{ marginRight: 16 }}
          >
            刷新
          </Button>
          <Button type='default' onClick={createItem}>
            新建
          </Button>
        </div>
        <p>globalToken: {props.store.token}</p>
        <Table
          columns={columns}
          dataSource={list}
          onChange={handleChange}
          rowClassName='todo-table-row'
        />
      </Content>
    </Fragment>
  );
};
export default inject("store")(observer(Home));
