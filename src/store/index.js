import Vue from "vue";
import Vuex from "vuex";
import disFactor from "./disFactor";
import { getRequest } from "@/api/user";
// import storage from "../utils/storage";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataList: [],
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
  },
  mutations: {
    SetDataList(state, value) {
      state.dataList = value;
    },
  },
  modules: {
    disFactor,
  },
});
