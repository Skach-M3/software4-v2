<template>
  <div class="main">
    <div class="left_tree">
      <el-tree
        ref="tree"
        :data="treeData"
        :show-checkbox="false"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :check-on-click-node="true"
        :highlight-current="true"
        @node-click="changeData"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="() => remove(node, data)"
            >
            </el-button>
          </span>
        </span>
      </el-tree>
      <el-dialog title="提示" :visible.sync="dialogDiseaseVisible" width="30%">
        <span>
          请输入新病种名称：<el-input
            placeholder="请输入内容"
            v-model="diseaseName"
            class="nameInput"
          ></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cleanInput()">取 消</el-button>
          <el-button type="primary" @click="() => append()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="right">
      <!--==========================     头部按钮     ==============================================================-->
      <div id="top_buttons">
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
        <el-button type="success">新建任务</el-button>
      </div>

      <!--===============================    卡片组     ==============================================================-->
      <div class="cardGroup">
        <el-card
          class="taskCard"
          v-for="item in taskList"
          :key="item.id"
          shadow="always"
          v-show="!(disease || leader) || (disease == item.disease && !leader) || (leader == item.leader && !disease) || (disease == item.disease && leader == item.leader)"
        >
          <div class="cardInfo">
            <div><span class="ttl">任务名称：</span>{{ item.taskName }}</div>
            <div><span class="ttl">负责人：</span>{{ item.leader }}</div>
            <div><span class="ttl">所属疾病：</span>{{ item.disease }}</div>
            <div><span class="ttl">使用模型：</span>{{ item.model }}</div>
            <div><span class="ttl">数据表：</span>{{ item.dataset }}</div>
            <div><span class="ttl">创建时间：</span>{{ item.createtime }}</div>
          </div>
          <div class="editButton">
            <el-button
              size="mini"
              type="primary"
              @click="handleCheck(item)"
              style="margin-right: 20px"
              >查看</el-button
            >
            <el-popconfirm
              title="删除后无法恢复"
              icon="el-icon-warning"
              icon-color="red"
              @confirm="handleDelete(item)"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </div>
        </el-card>
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
              <span
                >{{ result.para[index] }}：{{ result.paraValue[index] }}</span
              >
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
          <div v-for="(item, index) in result.res" :key="index">
            <span
              >{{ result.targetcolumn[index] }} -> {{ item.toString() }}</span
            >
          </div>
        </div>
        <div class="taskInfoBox result">
          <span class="lineStyle">▍</span
          ><span class="featureTitle">专家知识匹配度：</span>
          <span>{{ (result.ratio * 100).toFixed(2) }}%</span>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="resultDialogShow = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRequest } from "@/utils/api";
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import { treeData } from "@/components/tab/treeTargetData.js";

export default {
  computed: {
    ...mapState(["taskList"]),
    ...mapGetters(["taskLeaderList", "taskDiseaseList"]),
  },
  created() {
    this.getTaskList(sessionStorage.getItem("userid") - 0);
  },
  data() {
    return {
      disease: "",
      leader: "",
      resultDialogShow: false,
      result: {},
      treeData: JSON.parse(JSON.stringify(treeData)),
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
    changeData(node) {
      this.disease = node.label;
    },
  },
};
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 12% 85%;
}

.left_tree {
  display: inline-block;
  border-radius: 3px;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

#top_buttons {
  margin-left: 3%;
  margin-bottom: 20px;
}

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
.cardGroup {
  width: 100%;
  margin-left: 3%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-row-gap: 40px;
  grid-column-gap: 60px;
}

.cardInfo {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 定义两列，每列占用相等的空间 */
  grid-template-rows: auto auto auto auto; /* 定义四行，高度根据内容自适应 */
  gap: 10px; /* 定义网格行和列之间的间隙 */
}

.cardInfo > div:nth-child(5), /* 第五个子元素（数据表） */
.cardInfo > div:nth-child(6) /* 第六个子元素（创建时间） */ {
  grid-column: 1 / span 2; /* 这两个元素跨越两列 */
}

.ttl{
  font-weight: 600;
  color: #071135;
}

.editButton {
  margin-left: 30%;
  margin-top: 5%;
}

.icon {
  justify-self: end;
}
</style>
