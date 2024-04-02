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
    modelList: [],
    treeData:[]
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
          context.commit("SetDataList", res.reverse());
        })
        .catch((err) => {
          console.log("数据列表获取错误，请联系管理员。");
          console.log(err);
        });
    },
    getTaskList(context) {
      getRequest("/Task/all")
        .then((res) => {
          context.commit("SetTaskList", res.data);
        })
        .catch((err) => {
          console.log("任务列表获取错误，请联系管理员。");
          console.log(err);
        });
    },
    getModelList(context) {
      getRequest("/Model/all")
        .then((res) => {
          context.commit("SetModelList", res.data);
        })
        .catch((err) => {
          console.log("模型列表获取错误，请联系管理员。");
          console.log(err);
        });
    },
    getTreeData(context) {
      getRequest("/nodes/all")
        .then((res) => {
          context.commit("SetTreeData", res.data);
        })
        .catch((err) => {
          console.log("树形结构数据获取错误，请联系管理员。");
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
    SetModelList(state, value) {
      state.modelList = value;
    },
    SetTreeData(state, value) {
      state.treeData = value;
    },
  },
  modules: {
    disFactor: taskModule,
    f_Factor: taskModule,
    factorDis: taskModule,
  },
});
