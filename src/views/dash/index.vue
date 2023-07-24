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
          <el-table :data="modelInfo" stripe style="width: 100%" height="22.5vh">
            <el-table-column prop="taskid" label="模型id" width="140"></el-table-column>
            <el-table-column prop="modelname" label="模型名称" width="200"></el-table-column>
            <el-table-column prop="diseasename" label="涉及病种"></el-table-column>
            <el-table-column prop="publisher" label="发布人"> </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>

    <div class="bottomBigDiv">
      <div class="left" >
        <el-card :body-style="{padding:'0px',paddingLeft:'20px',paddingRight:'20px',height:'48vh'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>现有数据库信息</span>
          </div>
          <el-table :data="databaseInfo" stripe style="width: 100%"   max-height="400">
            <el-table-column prop="databasename" label="库名" width="130px"></el-table-column>
            <el-table-column prop="disease" label="涉及疾病" width="120px"></el-table-column>
            <el-table-column prop="tablenumber" label="数据表数"></el-table-column>
            <el-table-column prop="operators" label="创建者"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button plain type="primary" size="small" @click="getDataByBase(scope.row.databasename)">查看</el-button>
              </template>
              
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      
      <div class="mid">
        <el-card :body-style="{padding:'0px',paddingLeft:'20px',paddingRight:'20px',height:'48vh'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>库内数据信息 </span><span v-if="currentDatabase">（{{currentDatabase}}）</span>
          </div>
          <el-table :data="datasetInfo" stripe style="width: 100%"   max-height="400">
            <el-table-column prop="tablename" label="表名" width="110px"></el-table-column>
            <el-table-column prop="featurenumber" label="特征数" width="90px"></el-table-column>
            <el-table-column prop="datanumber" label="样本数"></el-table-column>
            <el-table-column prop="operators" label="创建者"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button plain type="primary" size="small" :disabled="!scope.row.projection"
                @click="getResult(scope.row.affiliationdatabase,scope.row.tablename)">查看结果</el-button>
              </template>
              
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <div class="right">
        <el-card :body-style="{padding:'0',paddingLeft:'20px',paddingRight:'20px',paddingTop:'20px',height:'45.9vh',overflow:'hidden'}">
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>挖掘任务概览</span><span v-if="currentDataset">（{{currentDataset}}）</span>
          </div>
          <div style="width:500px;height:500px; margin-top:20px">
            <PieChart 
            v-if="!pieLoading" 
            v-loading="pieLoading" 
            element-loading-text="正在获取结果"
            :data="rateCount" 
            :title="''"></PieChart>
          </div>
        </el-card>
      </div>

    </div>
  </div>
</template>

<script>
import PieChart from '@/components/user/PieChart.vue'
import {getRequest,postRequest} from '@/api/user'
import { mapActions } from 'vuex';
export default {
  name: "index",
  components:{PieChart: PieChart},
  data() {
    return {
      currentDatabase:"",
      currentDataset:"",
      modelInfo:[],
      databaseInfo:[],
      datasetInfo:[],
      predictResult:[],
      rateCount:[],
      pieLoading: false,
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
          router: "/Predict",
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
    };
  },
  
  mounted() {
    this.init();
  },

  methods: {
    init(){
      // 获取模型信息
      // getRequest("/Model/getall").then((res)=>{
      //   this.modelInfo = res;
      // }).catch(error=>{
      //   console.log(error);
      // })
      // 获取数据库信息
      // getRequest("/DataManager/database").then((res)=>{
      //   this.databaseInfo = res;
      //   if(this.databaseInfo[0].databasename){
      //     this.currentDatabase = this.databaseInfo[0].databasename;
      //     this.getDataByBase(this.databaseInfo[0].databasename);
      //   }
      // }).catch(error=>{
      //   console.log(error);
      // })
    },

    // 根据库名获取数据表
    getDataByBase(databasename){
      // postRequest("/DataManager/data",JSON.stringify({databasename})).then((res)=>{
      //   this.datasetInfo = res;
      //   if(databasename){
      //     this.currentDatabase = databasename;
      //     this.getResult(this.datasetInfo[0].affiliationdatabase,this.datasetInfo[0].tablename)
      //   }
      // }).catch(error=>{
      //   console.log(error);
      // })
    },

    // 获取特定数据表的预测结果
    getResult(basename,tablename){
      this.pieLoading = true;
      if(tablename){
        this.currentDataset = tablename;
      }
      getRequest("/DataManager/getInfoByTableName",{basename,tablename}).then((res)=>{
        this.predictResult = res.data;
        this.rateCount = [];
        let high = 0;
        let mid = 0;
        let low = 0;
        for (const item of this.predictResult) {
          if(!item.disease_probability){
            break;
          }
          let rate = parseFloat((item.disease_probability*100).toFixed(2));
          if(rate > 70){
            high++;
          }else if(rate >45){
            mid++;
          }else{
            low++;
          }
          
        }
        if(low > 0){
          let lowCount = {
            value: low,
            name: "低风险"
          }
          this.rateCount.push(lowCount);
        }
        if(mid >0 ){
          let midCount = {
            value: mid,
            name: "中风险"
          }
          this.rateCount.push(midCount);
        }
        if(high > 0){
          let highCount = {
            value: high,
            name: "高风险"
          }
          this.rateCount.push(highCount);
        }

        this.pieLoading = false;
      }).catch(error=>{
        console.log(error);
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
</style>
