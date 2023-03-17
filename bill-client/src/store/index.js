/* eslint-disable import/no-anonymous-default-export */
import { autorun, observable, makeObservable, makeAutoObservable } from "mobx";
const global = {
  // user.js
  accessToken: "",
  refreshToken: null,
  userId: "",
  name: "",
  age: "",
  gender: "",
  password: "",
  img: "",

  Http: {},
  // 页面跳转的
  navigation: null,
  search: "",
  apiVersion: null,
  isWXAppInstalled: false,
  wxAppInstallUrl: null,
  isWXAppSupportApi: false,
  Socket: {}
};

const defaultToken = localStorage.getItem("token");
const defaultUser = JSON.parse(localStorage.getItem("userInfo")) || {};
console.log("defaultToken", defaultToken);
class RootStore {
  token = defaultToken;
  userInfo = defaultUser;
  // @action
  constructor() {
    // this.userStore = new UserStore(this);
    this.todoStore = new TodoStore(this);
    makeObservable(this, {
      token: observable,
      userInfo: observable
    });
    autorun(() => console.log("111111", this.token, this.userInfo));
  }
}

class UserStore {
  userInfo = {};
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {});
  }

  setUserInfo = (userInfo) => {
    this.userInfo = { ...this.userInfo, ...userInfo };
    console.log("this.userInfo", this.userInfo);
  };

  getTodos(user) {
    return this.rootStore.todoStore.todos.filter(
      (todo) => todo.author === user
    );
  }
}

class TodoStore {
  todos = [];
  rootStore;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}

export default new RootStore();
