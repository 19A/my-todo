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
import { dateFormat } from "@/utils/index";
import dayjs from "dayjs";
import { Header, Content } from "@/components/Page";
// import { notification } from "@/components/utils";
import {
  queryListApi,
  createItemApi,
  deleteItemApi,
  modifyItemApi
} from "@/services";

const FormItem = Form.Item;
const { TextArea } = Input;
// const mock = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"]
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"]
//   }
// ];

// 0:待办, 1: 完成, 2:删除
const task_status = ["待办", "完成", "删除"];
const task = [
  {
    code: "todo",
    name: "待办",
    status: 0,
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
    name: "完成",
    status: 1,
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
    name: "删除",
    status: 2,
    action: []
  }
];

const TaskForm = forwardRef(({ record }, ref) => {
  const formRef = useRef();
  // const formE = Form.useForm();
  const { title, gmt_expire, content } = record;
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
        initialValue={dayjs("2023-01-08 16:03:27", "YYYY-MM-DD")}
      >
        <DatePicker format='YYYY-MM-DD' />
      </FormItem>
      <FormItem
        label='任务内容'
        name='content'
        rules={[{ required: true }]}
        initialValue={content}
      >
        <TextArea />
      </FormItem>
    </Form>
  );
});
const Home = (props) => {
  const [list, setList] = useState([]);
  const taskFormRef = useRef();

  const queryList = () => {
    queryListApi()
      .then((res) => {
        debugger;
        setList(res.data.content || []);
      })
      .catch((err) =>
        notification.error({
          placement: "bottomRight",
          message: "请求报错",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification."
        })
      );
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
      title: "任务新建",
      content: <TaskForm {...formProps} />,
      onOk: async () => {
        console.log("taskFormRef", taskFormRef);
        const formEntity = taskFormRef.current.formRef.current;
        const validatesRes = await formEntity.validateFields();
        if (!validatesRes) return Promise.reject();
        const res = await createItemApi(getValues(formEntity));
        if (!res) return Promise.reject();
        //任务创建成功,重新查询
        window.alert("任务创建成功");
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
        <Tag color={color} key={code} onClick={() => handleTask(code, record)}>
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
            window.alert("任务修改成功");
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
        debugger;
        if (deleteRes) {
          queryList();
        }
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "seq",
      key: "seq"
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
      title: "截止日期",
      dataIndex: "gmt_expire",
      key: "gmt_expire"
    },
    {
      title: "任务状态",
      dataIndex: "status",
      key: "status",
      render: (_, record) => getTags("task", record)
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
      <p>globalToken: {props.store.globalToken}</p>
      <Content>
        <Button onClick={queryList}>刷新</Button>
        <Button onClick={createItem}>新建</Button>
        {/* <Table columns={columns} dataSource={list} /> */}
        <Table columns={columns} dataSource={list} />
      </Content>
    </Fragment>
  );
};
export default inject("store")(observer(Home));
