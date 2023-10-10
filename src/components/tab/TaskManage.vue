<template>
  <div>
    <!--==========================     头部按钮     ==============================================================-->
    <div id="top_buttons">
      <div id="task_disease">
        <span>涉及病种：</span>
        <el-select v-model="disease" placeholder="请选择">
          <el-option
            v-for="item in taskDiseaseList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>

      <div id="task_leader">
        <span>任务负责人：</span>
        <el-select v-model="leader" placeholder="请选择">
          <el-option
            v-for="item in taskLeaderList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <el-button @click="clearFilter">清除</el-button>
    </div>

    <!--===============================    表格     ==============================================================-->
    <div id="table">
      <el-table
        :data="
          taskList.filter(
            (data) =>
              !(disease || leader) ||
              (data.disease.includes(disease) && data.leader.includes(leader))
          )
        "
        style="width: 100%"
        stripe
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column label="任务名称" prop="taskName"> </el-table-column>
        <el-table-column label="涉及病种" prop="disease"> </el-table-column>
        <el-table-column label="负责人" prop="leader"> </el-table-column>
        <el-table-column label="数据集" prop="dataset"> </el-table-column>
        <el-table-column label="使用模型" prop="model"> </el-table-column>
        <el-table-column label="创建时间" prop="createtime"> </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleCheck(scope.row)"
              style="margin-right: 20px"
              >查看</el-button
            >
            <el-popconfirm
              title="删除后无法恢复"
              icon="el-icon-warning"
              icon-color="red"
              @confirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="result.taskName"
      :visible.sync="resultDialogShow"
      v-if="resultDialogShow"
      width="32%"
      center
    >
      <div class="taskInfoBox principal">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">任务负责人：</span>
        <span>{{ result.leader }}</span>
      </div>
      <div
        class="taskInfoBox participants"
        v-if="result.participant.length > 0"
      >
        <span class="lineStyle">▍</span
        ><span class="featureTitle">参与人：</span>
        <span>{{ result.participant }}</span>
      </div>
      <div class="taskInfoBox disease">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">研究病种：</span>
        <span>{{ result.disease }}</span>
      </div>
      <div class="taskInfoBox dataset">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">所用数据：</span>
        <span>{{ result.dataset }}</span>
      </div>
      <div class="taskInfoBox algorithm">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">所用算法：</span>
        <span>{{ result.model }}</span>
      </div>
      <div class="taskInfoBox algorithmValue">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">算法参数：</span>
        <span v-if="result.para[0] == ''">本算法没有参数</span>
        <div v-if="result.para[0] != ''">
          <div v-for="(item, index) in result.para" :key="index">
            <span>{{ result.para[index] }}：{{ result.paraValue[index] }}</span>
          </div>
        </div>
      </div>
      <div class="taskInfoBox target_features">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">目标因素：</span>
        <span>{{ result.targetcolumn.toString() }}</span>
      </div>
      <div class="taskInfoBox use_features">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">所用特征：</span>
        <span>{{ result.feature.toString() }}</span>
      </div>
      <div class="taskInfoBox result">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">挖掘结果：</span>
        <div v-for="(item,index) in result.res" :key="index">
          <span>{{result.targetcolumn[index]}} -> {{item.toString()}}</span>
        </div>
      </div>
      <div class="taskInfoBox result">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">专家知识匹配度：</span>
        <span>{{(result.ratio * 100).toFixed(2)}}%</span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resultDialogShow = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRequest } from "@/utils/api";
import { mapGetters, mapMutations, mapState ,mapActions} from "vuex";

export default {
  computed: {
    ...mapState(["taskList"]),
    ...mapGetters(["taskLeaderList", "taskDiseaseList"]),
  },
  created() {
    this.getTaskList(sessionStorage.getItem("userid")-0);
  },
  data() {
    return {
      disease: "",
      leader: "",
      resultDialogShow: false,
      result: {},
    };
  },

  methods: {
    ...mapActions(["getTaskList"]),
    ...mapMutations(["SetTaskList"]),
    handleCheck(row) {
      getRequest(`Task/result/${row.id}`).then((res) => {
        this.result = res;
        this.resultDialogShow = true;
      });
    },
    handleDelete(row) {
      getRequest(`Task/delete/${row.id}`).then((res) => {
        console.log(res);
        this.SetTaskList(res.reverse());
      });
    },
    clearFilter() {
      this.disease = "";
      this.leader = "";
    },
  },
};
</script>

<style scoped>
#top_buttons > * {
  display: inline-block;
}
#task_disease {
  margin-right: 40px;
}
#task_leader {
  margin-right: 20px;
}
#table {
  margin-top: 10px;
}
.lineStyle {
  color: rgb(100, 172, 231);
}
.featureTitle {
  font-weight: 800;
}
/*#importDataTable >>> .el-input__inner{*/
/*    width: 85%;*/
/*}*/
/*#features >>> .el-input__inner{*/
/*    margin-bottom: 24px;*/
/*}*/
</style>
