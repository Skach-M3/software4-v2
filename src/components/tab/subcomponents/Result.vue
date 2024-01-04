<template>
  <div>
    <div id="pdf_1">
      <div class="taskBox1">
        <div class="taskInfoBox taskname">
          <span class="lineStyle">▍</span><span class="featureTitle">任务名称：</span>
          <span>{{ m_taskName }}</span>
        </div>
        <div class="taskInfoBox principal">
          <span class="lineStyle">▍</span><span class="featureTitle">任务负责人：</span>
          <span>{{ m_principal }}</span>
        </div>
        <div class="taskInfoBox participants" v-if="m_participants.length > 0">
          <span class="lineStyle">▍</span><span class="featureTitle">参与人：</span>
          <span>{{ m_participants }}</span>
        </div>
      </div>
      <div class="taskBox1">
        <div class="taskInfoBox disease">
          <span class="lineStyle">▍</span><span class="featureTitle">研究病种：</span>
          <span>{{ m_disease }}</span>
        </div>
        <div class="taskInfoBox dataset">
          <span class="lineStyle">▍</span><span class="featureTitle">所用数据：</span>
          <span>{{ m_dataset }}</span>
        </div>
        <div class="taskInfoBox algorithm">
          <span class="lineStyle">▍</span><span class="featureTitle">所用算法：</span>
          <span>{{ m_algorithm }}</span>
        </div>
      </div>

      <div class="taskInfoBox use_features">
        <span class="lineStyle">▍</span><span class="featureTitle">所用特征：</span>
        <span>{{ m_use_features.toString() }}</span>
      </div>
    </div>
    <div id="pdf_2">
      <div class="taskInfoBox result">
        <span class="lineStyle">▍</span><span class="featureTitle">特征分布：</span>
      </div>

      <div id="table">
        <div id="creatorFilter">
          <span>特征类型：</span>
          <el-select v-model="type" clearable placeholder="请选择">
            <el-option key="人口学" label="人口学" value="人口学"> </el-option>
            <el-option key="社会学" label="社会学" value="社会学"> </el-option>
            <el-option key="行为学" label="行为学" value="行为学"> </el-option>
          </el-select>
        </div>
        <el-table :data="distribution.filter((data) => !type || data.type.includes(type))"
          style="width: 95%; margin-top: 20px; margin-bottom: 50px" stripe max-height="800"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"   id="out-table">
          <el-table-column label="特征名" prop="feature_name"> </el-table-column>
          <el-table-column label="样本量" prop="num"> </el-table-column>
          <el-table-column label="特征类型" prop="type"> </el-table-column>
          <el-table-column label="平均值" prop="average"> </el-table-column>
          <el-table-column label="标准差" prop="bzc"></el-table-column>
          <el-table-column label="偏度" prop="skewness"> </el-table-column>
          <el-table-column label="峰度" prop="kurtosis"> </el-table-column>
          <el-table-column label="Shapiro-Wilk">
            <el-table-column label="统计量D值" prop="s_w_d"> </el-table-column>
            <el-table-column label="P值" prop="s_w_p"> </el-table-column>
          </el-table-column>
          <el-table-column label="Kolmogorov-Smirnov">
            <el-table-column label="统计量D值" prop="k_s_d"> </el-table-column>
            <el-table-column label="P值" prop="k_s_p"> </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div id="pdf_3">
      <div class="taskInfoBox result">
        <span class="lineStyle">▍</span><span class="featureTitle">任务结果：</span>
      </div>
      <h3>专家知识匹配度：{{ ratio }}</h3>
      <h3 v-if="m_result.time">运算时间：{{ m_result.time }} 秒</h3>
      <h3 v-if="m_result.ci">独立性检验次数：{{ m_result.ci }}次</h3>
    </div>
    <div id="pdf_4">
      <div class="graphBox">
        <GraphVue v-if="initFlag" :title_text="graphTitile" :node="node" :links="links"></GraphVue>
      </div>
      <div class="treeBox">
        <Tree v-if="initFlag" :title_text="graphTitile" :data="data"></Tree>
      </div>
    </div>
    <div class="buttonGroup">
      <el-button type="success" @click="exportRes()" round>导出结果</el-button>
      <el-button type="primary" @click="next()" round>保存任务</el-button>
    </div>
  </div>
</template>

<script>

import FileSaver from "file-saver";
import XLSX from "xlsx";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import vuex_mixin from "@/components/mixins/vuex_mixin";
import GraphVue from "./Graph.vue";
import Tree from "./Tree.vue";
import { postRequest } from "@/api/user";
import { mapMutations } from "vuex";
import { time } from "echarts";
export default {
  name: "Result",
  mixins: [vuex_mixin],
  components: {
    GraphVue,
    Tree,
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
      data: {},
      type: "",
      distribution: [
        {
          feature_name: "age",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "sex",
          num: 3200,
          type: "社会学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "cp",
          num: 3200,
          type: "社会学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "trestbps",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "chol",
          num: 3200,
          type: "社会学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "fbs",
          num: 3200,
          type: "行为学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "restcq",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "thalach",
          num: 3200,
          type: "社会学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "wxanq",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "oldpeak",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "slope",
          num: 3200,
          type: "社会学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "ca",
          num: 3200,
          type: "行为学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "thal",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "chcol",
          num: 3200,
          type: "行为学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "sodc",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "cakr",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "bdre",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "age",
          num: 3200,
          type: "行为学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
        {
          feature_name: "age",
          num: 3200,
          type: "人口学",
          average: 32.66,
          bzc: 7.858,
          skewness: 3.299,
          kurtosis: 41.529,
          s_w_d: 0.114,
          s_w_p: 0.0,
          k_s_d: 0.116,
          k_s_p: 0.0,
        },
      ],
    };
  },

  created() {
    console.log("console.log(this.m_target_feature);" + this.m_target_feature);
    console.log("this.m_result" + JSON.stringify(this.m_result.res));
    console.log("this.tree" + JSON.stringify(this.m_result.treeRes));
    var treeData = {
      name: "结果统计",
      children: [],
    };
    let tempNode = {
      name: this.m_target_feature[0],
      x: 300,
      y: 300,
      color: "#7B68EE",
      symbolSize: 65,
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
        tempNode.color = "#7B68EE";
        if (this.m_result.res.flat(Infinity).length < 1) {
          this.$message("未挖掘出相关关系");
          tempNode.x = 500;
          tempNode.y = 500;
          tempNode.color = "#c2b8fae1";
          break;
        }
        this.graphTitile = `${this.m_disease}相关危险因素`;
        this.node.push(JSON.parse(JSON.stringify(tempNode)));
        let ref_x = 1000 / (this.m_result.res[0].length + 1);
        for (let i = 0; i < this.m_result.res[0].length; i++) {
          tempNode.name = this.m_result.res[0][i];
          tempNode.x = ref_x * (i + 1);
          tempNode.y = top_y;
          tempNode.color = "#FFDEAD";
          this.node.push(JSON.parse(JSON.stringify(tempNode)));
          tempLink.source = this.m_target_feature[0];
          tempLink.target = this.m_result.res[0][i];
          // 权重是随机数
          tempLink.value = Number(Math.random().toFixed(3));
          tempLink.lineStyle.width += tempLink.value * 2;
          this.links.push(JSON.parse(JSON.stringify(tempLink)));
        }

        var firstChildren = {
          name: String(Object.keys(this.m_result.treeRes)),
          children: [],
        };
        treeData.children.push(firstChildren);
        var secondChildrenList = Array.from(this.m_result.treeRes[firstChildren.name]);
        secondChildrenList.forEach((element) => {
          var secondChildren = { name: String(element), children: [] };
          treeData.children[0].children.push(secondChildren);
        });
        this.data = treeData;
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
          if (
            this.m_result.res[i].length > 0 &&
            this.m_result.res[i].length <= 2
          ) {
            tempNode.color = "#7B68EE";
          } else if (this.m_result.res[i].length >= 3) {
            tempNode.color = "#000080";
          } else {
            tempNode.color = "#c2b8fae1";
          }
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
              tempNode.color = "#FFDEAD";
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
        var resTreedata = this.m_result.treeRes;
        Object.entries(resTreedata).forEach(function ([key, value], index) {
          var firstChildren = { name: String(key), children: [] };
          treeData.children.push(firstChildren);
          var secondChildrenList = Array.from(value);
          secondChildrenList.forEach((element) => {
            var secondChildren = { name: String(element), children: [] };
            treeData.children[index].children.push(secondChildren);
          });
        });
        this.data = treeData;
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
          if (
            this.m_result.res[i].length > 0 &&
            this.m_result.res[i].length <= 2
          ) {
            tempNode.color = "#7B68EE";
          } else if (this.m_result.res[i].length >= 3) {
            tempNode.color = "#000080";
          } else {
            tempNode.color = "#c2b8fae1";
          }
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
              tempNode.color = "#FFDEAD";
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
        var resTreedata = this.m_result.treeRes;
        Object.entries(resTreedata).forEach(function ([key, value], index) {
          var firstChildren = { name: String(key), children: [] };
          treeData.children.push(firstChildren);
          var secondChildrenList = Array.from(value);
          secondChildrenList.forEach((element) => {
            var secondChildren = { name: String(element), children: [] };
            treeData.children[index].children.push(secondChildren);
          });
        });
        this.data = treeData;
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
        ratio: this.m_result?.ratio?.toFixed(5),
        ci: this.m_result?.ci,
        res: this.m_result?.res,
        dataset: this.m_dataset,
        uid: sessionStorage.getItem("userid") - 0,
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
            message: "任务保存成功",
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
    exportExcel() {
        /* 从表生成工作簿对象 */
        this.type="";
        setTimeout(() => {

          var wb = XLSX?.utils.table_to_book(document.querySelector("#out-table"));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX?.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
        });
        try {
            FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            `${this.m_taskName}-特征分布表格.xlsx`
            );
        } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
        }, 1000);
        },

    async exportRes() {
      
      this.exportExcel()
      const divsToExport = ['pdf_1', 'pdf_3', 'pdf_4'];
      const pdf_positions = [
        { x: 5, y: 10 },
        { x: 5, y: 40 },
        { x: 2, y: 55 },
      ];
      const pdf = new jsPDF();

      const renderPromises = divsToExport.map((divId, index) => {
        const div = document.getElementById(divId);
        return html2canvas(div).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          const position = pdf_positions[index] || { x: 0, y: 0 };
          pdf.addImage(
            imgData,
            'PNG',
            position.x,
            position.y,
            pdfWidth,
            pdfHeight
          );
        });
      });

      await Promise.all(renderPromises);
      pdf.save(`${this.m_taskName}.pdf`);
    }
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
  margin-right: 15%;
}

.graphBox {
  width: 100%;
  height: 40vh;

  margin-top: 20px;
}

.treeBox {
  width: 100%;
  height: 50vh;

  margin-top: 20px;
}

.buttonGroup {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

span {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
