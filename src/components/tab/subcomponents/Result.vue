<template>
  <div>
    <div class="taskBox1">
      <div class="taskInfoBox taskname">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">任务名称：</span>
        <span>{{ m_taskName }}</span>
      </div>
      <div class="taskInfoBox principal">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">任务负责人：</span>
        <span>{{ m_principal }}</span>
      </div>
      <div class="taskInfoBox participants" v-if="m_participants.length > 0">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">参与人：</span>
        <span>{{ m_participants }}</span>
      </div>
    </div>
    <div class="taskBox1">
      <div class="taskInfoBox disease">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">研究病种：</span>
        <span>{{ m_disease }}</span>
      </div>
      <div class="taskInfoBox dataset">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">所用数据：</span>
        <span>{{ m_dataset }}</span>
      </div>
      <div class="taskInfoBox algorithm">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">所用算法：</span>
        <span>{{ m_algorithm }}</span>
      </div>
    </div>

    <div class="taskInfoBox use_features">
      <span class="lineStyle">▍</span
      ><span class="featureTitle">所用特征：</span>
      <span>{{ m_use_features.toString() }}</span>
    </div>
    <div class="taskInfoBox result">
      <span class="lineStyle">▍</span
      ><span class="featureTitle">任务结果：</span>
    </div>
    <h3>专家知识匹配度：{{ ratio }}</h3>
    <h3 v-if="m_result.time">运算时间：{{ m_result.time }} 秒</h3>
    <h3 v-if="m_result.ci">独立性检验次数：{{ m_result.ci }} 次</h3>
    <div class="graphBox">
      <GraphVue
        v-if="initFlag"
        :title_text="graphTitile"
        :node="node"
        :links="links"
      ></GraphVue>
    </div>
    <div class="buttonGroup">
      <el-button type="primary" @click="next()" round>完成</el-button>
    </div>
  </div>
</template>

<script>
import vuex_mixin from "@/components/mixins/vuex_mixin";
import GraphVue from "./Graph.vue";
import { postRequest } from "@/api/user";
import { mapMutations } from "vuex";
export default {
  name: "Result",
  mixins: [vuex_mixin],
  components: {
    GraphVue,
  },
  props: {
    moduleName: {
      type: String,
      default: "disFactor",
    },
  },
  computed: {
    ratio() {
      let num = (this.m_result.ratio * 100).toFixed(2);
      return num + "%";
    },
  },

  data() {
    return {
      initFlag: false,
      graphTitile: "",
      node: [],
      links: [],
    };
  },

  created() {
    let tempNode = {
      name: this.m_target_feature[0],
      x: 300,
      y: 300,
    };
    let tempLink = {
      source: "",
      target: "",
      value: 1,
      label: {
        show: true,
      },
      lineStyle: {
        width: 5,
        curveness: 0.2,
      },
    };
    let top_y = 200;
    let bottom_y = 300;
    switch (this.moduleName) {
      case "disFactor": {
        tempNode.name = this.m_target_feature[0];
        tempNode.x = 500;
        tempNode.y = bottom_y;
        if (this.m_result.res.length < 1) {
          this.$message("未挖掘出相关关系");
          tempNode.x = 500;
          tempNode.y = 500;
          break;
        }
        this.graphTitile = `${this.m_disease}相关危险因素`;
        this.node.push(JSON.parse(JSON.stringify(tempNode)));
        let ref_x = 1000 / (this.m_result.res[0].length + 1);
        for (let i = 0; i < this.m_result.res[0].length; i++) {
          tempNode.name = this.m_result.res[0][i];
          tempNode.x = ref_x * (i + 1);
          tempNode.y = top_y;
          this.node.push(JSON.parse(JSON.stringify(tempNode)));
          tempLink.source = this.m_target_feature[0];
          tempLink.target = this.m_result.res[0][i];
          // 权重是随机数
          tempLink.value = Number(Math.random().toFixed(3));
          tempLink.lineStyle.width += tempLink.value * 2;
          this.links.push(JSON.parse(JSON.stringify(tempLink)));
        }
        console.log(this.node, this.links);
        break;
      }

      case "f_Factor": {
        // 不能有重复的name，用map存储已有name进行去重
        let existedName = new Map();
        let ref_x_t = 1000 / (this.m_target_feature.length + 1);
        for (let i = 0; i < this.m_target_feature.length; i++) {
          tempNode.name = this.m_target_feature[i];
          tempNode.x = ref_x_t * i;
          tempNode.y = bottom_y;
          this.node.push(JSON.parse(JSON.stringify(tempNode)));
          existedName.set(tempNode.name, 1);
        }
        // 检查结果二维数组中是否有值并统计总长度
        let resLength = 0;
        let ref_x_r = [];
        for (const item of this.m_result.res) {
          let tempLen = Number((ref_x_t / (item.length + 1)).toFixed(2));
          ref_x_r.push(tempLen);
          if (item.length > 0) {
            resLength += item.length;
          }
        }
        if (resLength == 0) {
          {
            this.$message("未挖掘出相关关系");
            break;
          }
        }

        this.graphTitile = `${this.m_disease}中部分危险因素间关联关系`;

        for (let i = 0; i < this.m_result.res.length; i++) {
          for (let j = 0; j < this.m_result.res[i].length; j++) {
            console.log(this.m_result.res[i][j], ref_x_r[i]);
            if (!existedName.has(this.m_result.res[i][j])) {
              tempNode.name = this.m_result.res[i][j];
              tempNode.x = ref_x_t * i + (ref_x_r[i] + 1) * j;
              tempNode.y = top_y;
              this.node.push(JSON.parse(JSON.stringify(tempNode)));
              existedName.set(tempNode.name, 1);
            }
            tempLink.source = this.m_target_feature[i];
            tempLink.target = this.m_result.res[i][j];
            // 权重是随机数
            tempLink.value = Number(Math.random().toFixed(3));
            tempLink.lineStyle.width = 3 + tempLink.value * 8;
            this.links.push(JSON.parse(JSON.stringify(tempLink)));
          }
        }
        console.log(this.node, this.links);
        break;
      }
      case "factorDis": {
        // 不能有重复的name，用map存储已有name进行去重
        let existedName = new Map();
        let ref_x_t = 1000 / (this.m_target_feature.length + 1);
        for (let i = 0; i < this.m_target_feature.length; i++) {
          tempNode.name = this.m_target_feature[i];
          tempNode.x = ref_x_t * i;
          tempNode.y = bottom_y;
          this.node.push(JSON.parse(JSON.stringify(tempNode)));
          existedName.set(tempNode.name, 1);
        }
        // 检查结果二维数组中是否有值并统计总长度
        let resLength = 0;
        let ref_x_r = [];
        for (const item of this.m_result.res) {
          let tempLen = Number((ref_x_t / (item.length + 1)).toFixed(2));
          ref_x_r.push(tempLen);
          if (item.length > 0) {
            resLength += item.length;
          }
        }
        if (resLength == 0) {
          {
            this.$message("未挖掘出相关关系");
            break;
          }
        }

        this.graphTitile = `${this.m_target_feature[0]}因素相关疾病`;

        for (let i = 0; i < this.m_result.res.length; i++) {
          for (let j = 0; j < this.m_result.res[i].length; j++) {
            console.log(this.m_result.res[i][j], ref_x_r[i]);
            if (!existedName.has(this.m_result.res[i][j])) {
              tempNode.name = this.m_result.res[i][j];
              tempNode.x = ref_x_t * i + (ref_x_r[i] + 1) * j;
              tempNode.y = top_y;
              this.node.push(JSON.parse(JSON.stringify(tempNode)));
              existedName.set(tempNode.name, 1);
            }
            tempLink.source = this.m_target_feature[i];
            tempLink.target = this.m_result.res[i][j];
            // 权重是随机数
            tempLink.value = Number(Math.random().toFixed(3));
            tempLink.lineStyle.width = 3 + tempLink.value * 8;
            this.links.push(JSON.parse(JSON.stringify(tempLink)));
          }
        }
        console.log(this.node, this.links);
        break;
      }
      default:
        break;
    }
    this.initFlag = true;
  },

  methods: {
    ...mapMutations(["SetTaskList"]),
    next() {
      //上传任务
      let payload = {
        taskName: this.m_taskName,
        leader: this.m_principal,
        participant: this.m_participants,
        disease: this.m_disease,
        model: this.m_algorithm,
        feature: this.m_use_features,
        targetcolumn: this.m_target_feature,
        time: this.m_result?.time,
        ratio: this.m_result?.ratio.toFixed(5),
        ci: this.m_result?.ci,
        res: this.m_result?.res,
        dataset: this.m_dataset,
      };
      let alghName = "m_" + this.m_algorithm;
      let para = [];
      let paraValue = [];
      for (const key in this[alghName]) {
        if (Object.hasOwnProperty.call(this[alghName], key)) {
          console.log(this[alghName]);
          para.push(key);
          console.log(key);
          console.log(this[alghName][key]);
          paraValue.push(this[alghName][key]);
        }
      }
      payload.para = para;
      payload.paraValue = paraValue;
      postRequest("Task/add", payload)
        .then((res) => {
          this.SetTaskList(res.reverse());
          this.$message({
            showClose: true,
            type: "success",
            message: "新建任务成功",
          });
          this.m_changeStep(1);
          let defaultValue = {
            step: 1,
            taskName: "",
            principal: "",
            participants: "",
            disease: "",
            dataset: "",
            use_features: [],
            known_features: [],
            target_feature: [],
            SF_DRMB: {
              K_OR: 0.15,
              K_and_PC: 0.3,
              K_and_SP: 0.75,
            },
            result: [],
          };
          // TODO:这个改不了深层参数，需要写一个深拷贝通用方法
          this.m_changeTaskInfo(defaultValue);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "新建任务失败",
          });
          this.m_changeStep(this.m_step - 1);
          return false;
        });
    },
  },
};
</script>

<style scoped>
.taskBox1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.taskInfoBox {
  margin-bottom: 20px;
}

.lineStyle {
  color: rgb(100, 172, 231);
  font-weight: 100;
  font-size: 25px;
}

.featureTitle {
  font-size: 25px;
  margin-right: 30px;
  margin-bottom: 20px;
}

h3 {
  display: inline;
  margin-right: 20%;
}

.graphBox {
  width: 100%;
  height: 40vh;
  box-shadow: 0px 0px 13px -3px #c7e2ea;
  margin-top: 20px;
}

.buttonGroup .el-button {
  margin-top: 30px;
  margin-left: 50%;
}
</style>
