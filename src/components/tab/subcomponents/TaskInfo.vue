<template>
  <div id="mainBox">
    <el-form
      ref="taskInfoForm"
      :model="taskInfoForm"
      label-width="100px"
      class="form"
      label-position="top"
    >
      <el-form-item label="任务名称" prop="taskName" class="inputBox">
        <el-input v-model="taskInfoForm.taskName"></el-input>
      </el-form-item>
      <el-form-item label="任务负责人" prop="principal" class="inputBox">
        <el-input v-model="taskInfoForm.principal"></el-input>
      </el-form-item>
      <el-form-item label="参与人员" prop="participants" class="inputBox">
        <el-input v-model="taskInfoForm.participants"></el-input>
      </el-form-item>
      <el-form-item label="研究病种" prop="disease">
        <el-radio-group
          id="disGroup"
          v-model="taskInfoForm.disease"
          ref="disGroup"
        >
          <el-radio
            v-for="(dis, index) in disOptions"
            :key="index"
            :label="dis.value"
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
import { mapGetters, mapMutations } from "vuex";
import { getRequest, postRequest } from "@/api/user.js";
export default {
  name: "TaskInfo",
  mixins: [resetForm],
  computed: {
    ...mapGetters(["dataDisList"]),
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

  created() {
    this.init();
  },

  methods: {
    ...mapMutations("disFactor", ["ChangeStep", "ChangeTaskInfo"]),

    init() {
      let isInit = false;
      for (const item of this.dataDisList) {
        let index = this.disOptions.findIndex(({ name }) => name === item);
        if (index != -1) {
          this.disOptions[index].disable = false;
          if (!isInit) {
            this.taskInfoForm.disease = this.disOptions[index].value;
            isInit = true;
          }
        }
      }
    },

    next() {
      this.ChangeTaskInfo(this.taskInfoForm);
      getRequest(
        `/tTableManager/tablename?disease=${this.taskInfoForm.disease}`
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      this.ChangeStep(2);
    },
  },
};
</script>

<style scoped>
/* #mainBox{
  overflow: auto;
} */

.form .inputBox {
  width: 50%;
}
#disGroup {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
.disGroup-item {
  width: 180px;
  margin-bottom: 10px;
}
</style>
