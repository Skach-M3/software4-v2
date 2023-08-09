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
              style="margin-right:20px"
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
  </div>
</template>

<script>
import { postRequest } from "@/utils/api";
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["taskList"]),
    ...mapGetters(["taskLeaderList", "taskDiseaseList"]),
  },

  data() {
    return {
      disease: "",
      leader: "",
    };
  },

  methods: {
    handleCheck(row) {
      console.log(row);
    },
    handleDelete(row) {
      // this.tableData.splice(index, 1);
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
/*#importDataTable >>> .el-input__inner{*/
/*    width: 85%;*/
/*}*/
/*#features >>> .el-input__inner{*/
/*    margin-bottom: 24px;*/
/*}*/
</style>
