import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
// import metastasis from "@/views/lung/metastasis";
// import earlyLung from "@/views/lung/earlyLung";
// import connectMining from "@/components/tab/connectMining.vue";
import dangePredict from "@/components/tab/dangePredict.vue";
import TaskManage from "@/components/tab/TaskManage.vue";
import dataManage from "@/components/tab/dataManage.vue";
import modelManage from "@/components/tab/modelManage.vue";
import DisFactor from "@/components/tab/DisFactor.vue"
import TaskInfo from "@/components/tab/subcomponents/TaskInfo.vue"
import DataSelect from "@/components/tab/subcomponents/DataSelect.vue"
// import LogIn from "@/views/LogIn.vue"
import UserSideBar from "@/components/user/UserSideBar.vue"
import Predict from "@/components/user/Predict.vue"
import DieaseIntro from "@/components/user/DieaseIntro/DieaseIntro.vue"
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
        path: "Predict",
        name: "Predict_manager",
        component: Predict,
      },
      {
        path: "DieaseIntro",
        name: "DieaseIntro_manager",
        component: DieaseIntro,
      },
      {
        path: "SoftwareIntro",
        name: "SoftwareIntro",
        component: SoftwareIntro,
      },
      {
        path: "dangePredict",
        name: "dangePredict",
        component: dangePredict,
      },
      {
        path: "TaskManage",
        name: "TaskManage",
        component: TaskManage,
      },
      {
        path: "DisFactor",
        name: "DisFactor",
        component: DisFactor
      },
    ],
  },
  {
    path: "/UserSideBar",
    name: "UserSideBar",
    component: UserSideBar,
    children: [
      {
        path: "Predict",
        name: "Predict",
        component: Predict,
      },
      {
        path: "DieaseIntro",
        name: "DieaseIntro",
        component: DieaseIntro,
      },
    ],
  },

  // {
  //     path : '/metastasis',
  //     name: 'metastasis',
  //     component : metastasis
  // },
  // {
  //     path:'/connectMining',
  //     name:'connectMining',
  //     component:connectMining,
  // },{
  //     path:'/dangePredict',
  //     name:'dangePredict',
  //     component:dangePredict,
  // },
  // {
  //     path:'/importModel',
  //     name:'importModel',
  //     component:importModel,
  // }
];

const router = new VueRouter({
  routes
})
export default router
