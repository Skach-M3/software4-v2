import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import TaskManage from "@/components/tab/TaskManage.vue";
import dataManage from "@/components/tab/dataManage.vue";
import modelManage from "@/components/tab/modelManage.vue";
import DisFactor from "@/components/tab/DisFactor.vue"
import F_Factor from "@/components/tab/F_Factor.vue";
import FactorDis from "@/components/tab/FactorDis.vue";
// import LogIn from "@/views/LogIn.vue"
import SoftwareIntro from "@/components/tab/SoftwareIntro.vue";
Vue.use(VueRouter)

const routes = [
  // {有登录页面时加上
  //   path: "/",
  //   name: "LogIn",
  //   component: LogIn,
  // },
  {
    // path: "/sideBar",有登录页面时加上
    path: "/",
    name: "SideBar",
    redirect: "/SoftwareIntro",
    component: SideBar,
    children: [
      {
        path: "dash",
        name: "dash",
        component: dash,
      },
      {
        path: "dataManage",
        name: "dataManage",
        component: dataManage,
      },
      {
        path: "modelManage",
        name: "modelManage",
        component: modelManage,
      },
      {
        path: "SoftwareIntro",
        name: "SoftwareIntro",
        component: SoftwareIntro,
      },
      {
        path: "TaskManage",
        name: "TaskManage",
        component: TaskManage,
      },
      {
        path: "DisFactor",
        name: "DisFactor",
        component: DisFactor,
      },
      {
        path: "F_Factor",
        name: "F_Factor",
        component: F_Factor,
      },
      {
        path: "FactorDis",
        name: "FactorDis",
        component: FactorDis,
      },
    ],
  },
];

const router = new VueRouter({
  routes
})
export default router
