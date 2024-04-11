import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import echarts from "echarts";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
 
import UmyUi from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css';// 引入样式
 
Vue.use(UmyUi);
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VXETable)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
