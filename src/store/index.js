import Vue from "vue";
import Vuex from "vuex";
import taskModule from "./taskModule";
import { getRequest } from "@/api/user";
// import storage from "../utils/storage";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataList: [],
    taskList: [],
  },

  getters: {
    // 获取有数据的疾病列表
    dataDisList(state) {
      let newArray = [];
      state.dataList.forEach(({ disease }) => {
        if (newArray.indexOf(disease) === -1) {
          //去重
          newArray.push(disease);
        }
      });
      return newArray;
    },

    dataCreatorList(state) {
      let newArray = [];
      state.dataList.forEach(({ creator }) => {
        if (newArray.indexOf(creator) === -1) {
          //去重
          newArray.push(creator);
        }
      });
      return newArray;
    },

    taskLeaderList(state) {
      let newArray = [];
      state.taskList.forEach(({ leader }) => {
        if (newArray.indexOf(leader) === -1) {
          //去重
          newArray.push(leader);
        }
      });
      return newArray;
    },
    taskDiseaseList(state) {
      let newArray = [];
      state.taskList.forEach(({ disease }) => {
        if (newArray.indexOf(disease) === -1) {
          //去重
          newArray.push(disease);
        }
      });
      return newArray;
    },
  },

  actions: {
    getDataList(context) {
      getRequest("/DataTable/upall")
        .then((res) => {
          context.commit("SetDataList", res);
        })
        .catch((err) => {
          alert("数据获取错误，请联系管理员。");
          console.log(err);
        });
    },
    getTaskList(context) {
      getRequest("/Task/all")
        .then((res) => {
          context.commit("SetTaskList", res);
        })
        .catch((err) => {
          alert("数据获取错误，请联系管理员。");
          console.log(err);
        });
    },
  },
  mutations: {
    SetDataList(state, value) {
      state.dataList = value;
    },
    SetTaskList(state, value) {
      state.taskList = value;
    },
  },
  modules: {
    disFactor: taskModule,
    f_Factor: taskModule,
    factorDis: taskModule,
  },
});
