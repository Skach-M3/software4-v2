<template>
  <div>
    <el-container>
      <el-tabs id="modelList" v-model="model" tab-position="left">
        <el-tab-pane label="SF-DRMB">
          <div class="titleBox">SF-DRMB</div>
          <div class="introBox">
            <p>模型说明：</p>
            <p>
              SF-DRMB是一种因果特征选择算法，可用于挖掘疾病和危险因素之间存在的因果关系。
            </p>
          </div>
          <div class="paramBox">
            <el-form
              v-model="SF_DRMB_form"
              class=""
              label-position="top"
              ref="SF_DRMB_ref"
            >
              <el-form-item>
                <template slot="label">
                  <span class="paramTitle">K_OR</span>
                  <el-popover placement="right" trigger="hover">
                    <div>
                      K_OR参数用于控制恢复假阴性特征数，值越大计算越复杂，计算时间更长，结果不一定更好
                    </div>
                    <el-icon
                      slot="reference"
                      class="el-icon-warning-outline"
                    ></el-icon>
                  </el-popover>
                </template>
                <el-input v-model="SF_DRMB_form.K_OR"></el-input>
                <span class="valueRange">(取值范围为 0 - 1 )</span>
              </el-form-item>

              <el-form-item>
                <template slot="label">
                  <span class="paramTitle">K_and_pc</span>
                  <el-popover placement="right" trigger="hover">
                    <div>
                      K_and_pc参数用于控制剔除父子假阳性特征数，值越大计算越复杂，计算时间更长，结果不一定更好
                    </div>
                    <el-icon
                      slot="reference"
                      class="el-icon-warning-outline"
                    ></el-icon>
                  </el-popover>
                </template>
                <el-input v-model="SF_DRMB_form.K_and_PC"></el-input>
                <span class="valueRange">(取值范围为 0.15 - 0.3 )</span>
              </el-form-item>

              <el-form-item>
                <template slot="label">
                  <span class="paramTitle">K_and_sp</span>
                  <el-popover placement="right" trigger="hover">
                    <div>
                      K_and_sp参数用于控制剔除配偶假阳性特征数，值越大计算越复杂，计算时间更长，结果不一定更好
                    </div>
                    <el-icon
                      slot="reference"
                      class="el-icon-warning-outline"
                    ></el-icon>
                  </el-popover>
                </template>
                <el-input v-model="SF_DRMB_form.K_and_SP"></el-input>
                <span class="valueRange">(取值范围为 0.4 - 0.8 )</span>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="FP-Growth" :disabled="true">FP-Growth</el-tab-pane>
        <el-tab-pane label="SSP-Tree" :disabled="true">SSP-Tree</el-tab-pane>
        <el-tab-pane label="Logistic Regression" :disabled="true"
          >Logistic Regression</el-tab-pane
        >
        <div class="buttonBox">
          <el-button round @click="backStep()">上一步</el-button>
          <el-button round @click="resetForm('SF_DRMB_ref')"></el-button>
          <el-button type="primary" round @click="submit()">提交运算</el-button>
        </div>
      </el-tabs>
    </el-container>
  </div>
</template>

<script>
import { postRequest } from "@/api/user";
import { mapMutations, mapState } from "vuex";
import { resetForm } from "@/components/mixins/mixin.js";
export default {
  name: "AlgorithmSelect",
  mixins:[resetForm],
  computed: {
    ...mapState("disFactor", [
      "step",
      "dataset",
      "target_feature",
      "use_features",
      "SF_DRMB",
    ]),
  },
  data() {
    return {
      model: "",
      SF_DRMB_form: {
        K_OR: 0.15,
        K_and_PC: 0.3,
        K_and_SP: 0.75,
      },
      res: "",
    };
  },

  methods: {
    ...mapMutations("disFactor", ["ChangeStep", "ChangeTaskInfo"]),
    
    init(){
      this.SF_DRMB_form = this.SF_DRMB;
    },

    backStep() {
      this.ChangeStep(this.step - 1);
    },

    submit() {
      this.ChangeTaskInfo(this.SF_DRMB_form);
      let payload = {
        tablename: this.dataset,
        targetcolumn: this.target_feature,
        fea: this.use_features,
        K_OR: this.SF_DRMB.K_OR,
        K_and_pc: this.SF_DRMB.K_and_PC,
        K_and_sp: this.SF_DRMB.K_and_SP,
      };
      postRequest("/runtime_bus/submit", payload)
        .then((res) => {
          console.log(res);
          this.ChangeTaskInfo({ result: res });
          this.ChangeStep(this.step + 1);
        })
        .catch((err) => {
          alert("请求超时");
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#modelList {
  height: 60vh;
  width: 100%;
  margin-bottom: 5vh;
}

.titleBox {
  margin: 10px auto 10px auto;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.introBox {
  background-color: #e8f3ff;
  height: 5vh;
  width: 100%;
  overflow: auto;
}

.introBox p {
  margin-left: 15px;
}
.introBox p:first-child {
  font-size: 18px;
  font-weight: 600;
}
.introBox p:nth-child(2) {
  margin-left: 2em;
}

.paramBox .el-form {
  margin-top: 2vh;
  margin-left: 60vh;
}
.paramBox .el-form .el-input {
  width: 25vh;
  margin-top: -50px;
}

.paramTitle {
  font-size: 20px;
  font-weight: 600;
}

.valueRange {
  color: gray;
  margin-left: 10px;
}

.el-icon-warning-outline {
  margin-left: 10px;
  font-size: 20px;
}
.el-icon-warning-outline:hover {
  color: #368ce7;
}

.buttonBox {
  margin-top: 200px;
  width: 22vh;
  margin: auto;
}
</style>
