<template>
  <div>
    <div class="topBigDiv">
      <div class="left">
        <el-card class="card">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>快捷入口</span>
          </div>
          <div class="quickEntryBox">
            <div v-for="(item, index) in quickEntry" :key="index">
              <div class="singleBox" @click="quickLink(index)">
                <img
                  :src="item.img"
                  class="imgStyle"
                  style="border-radius: 15px"
                />
                <div style="text-align: center">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right">
        <el-card class="card" :body-style="{padding:'0px',paddingLeft:'20px',paddingRight:'20px'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>系统模型信息</span>
          </div>
          <el-table :data="modelList" stripe style="width: 100%" height="22.5vh">
            <el-table-column prop="id" label="模型id" width="140"></el-table-column>
            <el-table-column prop="modelName" label="模型名称" width="200"></el-table-column>
            <el-table-column prop="publisher" label="发布人"> </el-table-column>
            <el-table-column prop="createtime" label="创建时间"></el-table-column>
            
          </el-table>
        </el-card>
      </div>
    </div>

    <div class="bottomBigDiv">
      <div class="left" >
        <el-card :body-style="{padding:'0px',paddingLeft:'20px',paddingRight:'20px',height:'48vh'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>数据表概览</span>
          </div>
          <el-table :data="dataList" stripe style="width: 100%"   max-height="400">
            <el-table-column prop="table_name" label="表名" width="130px"></el-table-column>
            <el-table-column prop="disease" label="涉及疾病" width="150px"></el-table-column>
            <el-table-column prop="featurenumber" label="特征数"></el-table-column>
            <el-table-column prop="creator" label="创建者"> </el-table-column>
          </el-table>
        </el-card>
      </div>
      
      <div class="mid">
        <el-card :body-style="{padding:'0px',paddingLeft:'20px',paddingRight:'20px',height:'48vh'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>任务信息概览 </span>
          </div>
          <el-table :data="taskList" stripe style="width: 100%"   max-height="400">
            <el-table-column prop="taskName" label="任务名"></el-table-column>
            <el-table-column prop="leader" label="负责人"></el-table-column>
            <el-table-column prop="model" label="算法"></el-table-column>
            <el-table-column prop="dataset" label="数据集"></el-table-column>
          </el-table>
        </el-card>
      </div>

      <div class="right">
        <el-card :body-style="{padding:'0',paddingLeft:'20px',paddingRight:'20px',paddingTop:'20px',height:'45.9vh',overflow:'hidden'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>近期新建任务数</span>
          </div>
          <div id="chartBox">
            <LineChartVue :statistic="taskTotal"></LineChartVue>
          </div>
        </el-card>
      </div>

    </div>
  </div>
</template>

<script>
import {getRequest,postRequest} from '@/api/user'
import { mapActions, mapState } from 'vuex';
import LineChartVue from '@/components/tab/subcomponents/LineChart.vue';
export default {
  name: "index",
  components:{LineChartVue},
  computed:{
    ...mapState(["modelList","dataList","taskList"])
  },
  data() {
    return {
      quickEntry: [
        {
          title: "数据管理",
          img: require("../../assets/JKZX.png"),
          router: "/dataManage",
        },
        {
          title: "任务管理",
          img: require("../../assets/modelTrain.png"),
          router: "/TaskManage",
        },
        {
          title: "疾病危险因素挖掘",
          img: require("../../assets/singlePredict.png"),
          router: "/DisFactor",
        },
        {
          title: "危险因素相关因素挖掘",
          img: require("../../assets/batchPredict.png"),
          router: "",
        },
        {
          title: "危险因素相关疾病挖掘",
          img: require("../../assets/batchPredict.png"),
          router: "",
        }
      ],
      taskTotal:[],
      sevendays:[],
    };
  },
  
  beforeMount() {
    this.init();
  },

  methods: {
    init(){
      getRequest("Task/total").then(res=>{
        console.log(res);
      })
    },
    

    quickLink(index) {
      this.$router.push(this.quickEntry[index].router);
    },
  },
};
</script>

<style scoped>
.topBigDiv {
  box-sizing: border-box;
  height: 30vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topBigDiv .left {
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
.topBigDiv .right {
  box-sizing: border-box;
  width: 49%;
  height: 100%;
}
.topBigDiv .left .quickEntryBox {
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  margin-top: 38px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.topBigDiv .left .quickEntryBox .singleBox {
  /*border: 1px red solid;*/
  /*box-sizing: border-box;*/
  width: 80px;
  height: 80px;
  border-radius: 20%;
}
.topBigDiv .left .quickEntryBox .imgStyle {
  width: 90%;
  height: 90%;
}
.bottomBigDiv {
  box-sizing: border-box;
  height: 55vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.bottomBigDiv .left {
  box-sizing: border-box;
  height: 100%;
  width: 33%;
  overflow: hidden;
}
.bottomBigDiv .mid {
  box-sizing: border-box;
  height: 100%;
  width: 33%;
}
.bottomBigDiv .right {
  box-sizing: border-box;
  height: 100%;
  width: 33%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.lineStyle {
  color: rgb(100, 172, 231);
  font-weight: 40;
}
.card {
  padding: 0;
  height: 100%;
}

#chartBox{
  width: 100%;
  height: 100%;
}
</style>
