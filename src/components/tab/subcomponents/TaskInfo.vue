<template>
  <div id="mainBox">
    <el-form
      ref="taskInfoForm"
      :model="taskInfoForm"
      label-width="100px"
      class="form"
      label-position="top"
    >
      <el-form-item prop="taskName" class="inputBox shortItem">
        <template slot="label">
          <span class="lineStyle">▍</span>
          <span>任务名称</span>
        </template>
        <el-input v-model="taskInfoForm.taskName"></el-input>
      </el-form-item>
      <el-form-item prop="principal" class="inputBox shortItem">
        <template slot="label">
          <span class="lineStyle">▍</span>
          <span>任务负责人</span>
        </template>
        <el-input v-model="taskInfoForm.principal"></el-input>
      </el-form-item>
      <el-form-item prop="participants" class="inputBox shortItem">
        <template slot="label">
          <span class="lineStyle">▍</span>
          <span>参与人员</span>
        </template>
        <el-input v-model="taskInfoForm.participants"></el-input>
      </el-form-item>
      <el-form-item prop="disease">
        <template slot="label">
          <span class="lineStyle">▍</span>
          <span>研究病种</span>
        </template>
        <el-radio-group
          id="disGroup"
          v-model="taskInfoForm.disease"
          ref="disGroup"
        >
          <el-radio
            v-for="(dis, index) in disOptions"
            :key="index"
            :label="dis.name"
            class="disGroup-item"
            border
            :disabled="dis.disable"
            >{{ dis.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('taskInfoForm')" round>重置</el-button>
        <el-button type="primary" @click="next()" round>下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { disOptions } from "@/components/tab/constData.js";
import { resetForm } from "@/components/mixins/mixin.js";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "TaskInfo",
  mixins: [resetForm],
  computed: {
    ...mapGetters(["dataDisList"]),
    ...mapState("disFactor", [
      "taskName",
      "principal",
      "participants",
      "disease",
    ]),
  },
  data() {
    return {
      disOptions: disOptions,
      taskInfoForm: {
        taskName: "",
        principal: "",
        participants: "",
        disease: "",
      },
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    ...mapMutations("disFactor", ["ChangeStep", "ChangeTaskInfo"]),

    init() {
      //和vuex内数据同步
      this.taskInfoForm.taskName = this.taskName;
      this.taskInfoForm.principal = this.principal;
      this.taskInfoForm.participants = this.participants;
      this.taskInfoForm.disease = this.disease;
      if (!this.disease) {
        let isInit = false; //是否已经设置默认选择第一个可选病
        for (const item of this.dataDisList) {
          let index = this.disOptions.findIndex(({ name }) => name === item);
          if (index != -1) {
            this.disOptions[index].disable = false;
            if (!isInit) {
              this.taskInfoForm.disease = this.disOptions[index].name;
              isInit = true;
            }
          }
        }
      }
    },

    next() {
      if (this.taskInfoForm.taskName.length < 1 || this.taskInfoForm.principal.length < 1) {
        alert("请填写任务名称和负责人");
        return;
      }
      this.ChangeTaskInfo(this.taskInfoForm);
      this.ChangeStep(2);
    },
  },
};
</script>

<style scoped>
/* #mainBox{
  overflow: auto;
} */
.form {
  width: 80vh;
  margin: auto;
}
.form .inputBox {
  width: 25%;
}
.form .shortItem {
  display: inline-block;
  margin-right: 12vh;
}
.form .inputBox:last-child {
  width: 50%;
}

.lineStyle {
  color: rgb(100, 172, 231);
}

#disGroup {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.disGroup-item {
  width: 180px;
  margin-bottom: 10px;
}
</style>
