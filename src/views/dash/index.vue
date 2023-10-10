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
        <el-card
          class="card"
          :body-style="{
            padding: '0px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }"
        >
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>系统模型信息</span>
          </div>
          <el-table
            :data="modelList"
            stripe
            style="width: 100%"
            height="22.5vh"
          >
            <el-table-column
              prop="id"
              label="模型id"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="modelName"
              label="模型名称"
              width="200"
            ></el-table-column>
            <el-table-column prop="publisher" label="发布人"> </el-table-column>
            <el-table-column
              prop="createtime"
              label="创建时间"
            ></el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>

    <div class="bottomBigDiv">
      <div class="left">
        <el-card
          :body-style="{
            padding: '0px',
            paddingLeft: '20px',
            paddingRight: '20px',
            height: '48vh',
          }"
        >
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>数据表概览</span>
          </div>
          <el-table
            :data="dataList"
            stripe
            style="width: 100%"
            max-height="400"
          >
            <el-table-column
              prop="table_name"
              label="表名"
              width="130px"
            ></el-table-column>
            <el-table-column
              prop="disease"
              label="涉及疾病"
              width="150px"
            ></el-table-column>
            <el-table-column
              prop="featurenumber"
              label="特征数"
            ></el-table-column>
            <el-table-column prop="creator" label="创建者"> </el-table-column>
          </el-table>
        </el-card>
      </div>

      <div class="mid">
        <el-card
          :body-style="{
            padding: '0px',
            paddingLeft: '20px',
            paddingRight: '20px',
            height: '48vh',
          }"
        >
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>任务信息概览 </span>
          </div>
          <el-table
            :data="taskList"
            stripe
            style="width: 100%"
            max-height="400"
          >
            <el-table-column prop="taskName" label="任务名"></el-table-column>
            <el-table-column prop="leader" label="负责人"></el-table-column>
            <el-table-column prop="model" label="算法"></el-table-column>
            <el-table-column prop="dataset" label="数据集"></el-table-column>
          </el-table>
        </el-card>
      </div>

      <div class="right">
        <el-card
          :body-style="{
            padding: '0',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '20px',
            height: '45.9vh',
            overflow: 'hidden',
          }"
        >
          <div slot="header" class="clearfix">
            <span class="lineStyle">▍</span><span>近期新建任务数</span>
            <el-select
              class="chartSelect"
              v-model="charttype"
              placeholder="请选择"
              size="mini"
              @change="changeChart"
            >
              <el-option
                v-for="item in chartOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div id="chartBox">
            <!-- 不加v-if判断x轴长度他就可能无法渲染 -->
            <LineChartVue
              v-if="sevendays.length > 0"
              :legend="chartLegend"
              :statistic="chartData"
              :x="sevendays"
            ></LineChartVue>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest } from "@/api/user";
import { mapGetters, mapMutations, mapState ,mapActions} from "vuex";
import LineChartVue from "@/components/tab/subcomponents/LineChart.vue";
export default {
  name: "index",
  components: { LineChartVue },
  computed: {
    ...mapState(["modelList", "dataList", "taskList"]),
  },
  data() {
    return {
      quickEntry: [
        {
          title: "数据管理",
          img: require("../../assets/JKZX.png"),
          router: "dataManage",
        },
        {
          title: "任务管理",
          img: require("../../assets/modelTrain.png"),
          router: "TaskManage",
        },
        {
          title: "疾病危险因素挖掘",
          img: require("../../assets/singlePredict.png"),
          router: "DisFactor",
        },
        {
          title: "危险因素相关因素挖掘",
          img: require("../../assets/batchPredict.png"),
          router: "F_Factor",
        },
        {
          title: "危险因素相关疾病挖掘",
          img: require("../../assets/lianxi.png"),
          router: "FactorDis",
        },
      ],
      chartLegend: [],
      modelName: [],
      chartData: [],
      taskTotal: [],
      taskModel: [],
      sevendays: [],
      charttype: 1,
      chartOptions: [
        {
          value: 1,
          label: "总数",
        },
        {
          value: 2,
          label: "分任务",
        },
      ],
    };
  },

  created() {
    this.init();
    this.getTaskList(sessionStorage.getItem("userid")-0);
  },

  methods: {
    ...mapActions(["getTaskList"]),
    init() {
      getRequest("Task/totals").then((res) => {
        console.log(res);
        this.chartLegend = ["当天任务数"];

        this.taskTotal.push({
          name: "当天任务数",
          type: "line",
          smooth: true,
          data: [],
        });
        for (const item of this.modelList) {
          this.modelName.push(item.modelName);
          this.taskModel.push({
            name: item.modelName,
            type: "line",
            smooth: true,
            data: new Array(7).fill(0),
          });
        }
        console.log(this.taskModel);
        for (let i = 0; i < 7; i++) {
          this.sevendays.push(res[i].formattedDate);
          this.taskTotal[0].data.push(res[i].total);
          for (const model of res[i].usages) {
            let index = this.taskModel.findIndex((element) => {
              return element.name.trim() == model.model.trim();
            });
            console.log(index);
            this.taskModel[index].data[i] = model.usageCount;
          }
        }
        console.log(this.taskModel);
        console.log(this.sevendays);
        this.chartData = this.taskTotal;
        console.log(this.chartData[0].data);
      });
    },

    quickLink(index) {
      this.$router.push(this.quickEntry[index].router);
    },

    changeChart() {
      switch (this.charttype) {
        case 1: {
          this.chartLegend = ["当天任务数"];
          this.chartData = this.taskTotal;
          break;
        }
        case 2: {
          this.chartLegend = this.modelName;
          this.chartData = this.taskModel;
          break;
        }
      }
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

#chartBox {
  width: 100%;
  height: 100%;
}

.chartSelect {
  width: 100px;
  margin-left: 25px;
}
</style>
