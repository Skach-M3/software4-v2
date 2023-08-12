<template>
  <div class="Box">
    <!-- ------------------------------------选择目标特征 ------------------------------->
    <div v-if="moduleName !== 'disFactor'">
      <div class="top">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">选择目标特征：</span>
        <!-- <el-checkbox
          v-model="checkAll_target"
          @change="
            (val) => {
              this.targetFeature = val ? this.allFeatures : [];
            }
          "
          border
          size="small"
          >全选</el-checkbox
        > -->
      </div>
      <div v-if="peopleFeatures.length > 0">
        <h3 class="featureSubTitle">人口学特征</h3>
        <el-checkbox-group v-model="targetFeature" @change="changeBox_target()">
          <el-checkbox
            v-for="item in peopleFeatures"
            :label="item"
            :key="item"
            border
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </div>

      <div v-if="physiologicalFeatures.length > 0">
        <h3 class="featureSubTitle">生理学特征</h3>
        <el-checkbox-group v-model="targetFeature" @change="changeBox_target()">
          <el-checkbox
            v-for="item in physiologicalFeatures"
            :label="item"
            :key="item"
            border
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </div>

      <div v-if="socialFeatures.length > 0">
        <h3 class="featureSubTitle">社会学特征</h3>
        <el-checkbox-group v-model="targetFeature" @change="changeBox_target()">
          <el-checkbox
            v-for="item in socialFeatures"
            :label="item"
            :key="item"
            border
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <el-divider></el-divider>
    </div>

    <!-- ------------------------------------- 参与运算特征 ---------------------------->
    <div>
      <div class="top">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">参与运算的特征：</span>
        <el-checkbox
          v-model="checkAll_1"
          @change="
            (val) => {
              this.computeFeatures = val ? this.allFeatures : [];
            }
          "
          border
          size="small"
          >全选</el-checkbox
        >
      </div>

      <div v-if="peopleFeatures.length > 0">
        <h3 class="featureSubTitle">人口学特征</h3>
        <el-checkbox-group v-model="computeFeatures" @change="changeBox_1()">
          <el-checkbox
            v-for="item in peopleFeatures"
            :label="item"
            :key="item"
            border
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </div>

      <div v-if="physiologicalFeatures.length > 0">
        <h3 class="featureSubTitle">生理学特征</h3>
        <el-checkbox-group v-model="computeFeatures" @change="changeBox_1()">
          <el-checkbox
            v-for="item in physiologicalFeatures"
            :label="item"
            :key="item"
            border
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </div>

      <div v-if="socialFeatures.length > 0">
        <h3 class="featureSubTitle">社会学特征</h3>
        <el-checkbox-group v-model="computeFeatures" @change="changeBox_1()">
          <el-checkbox
            v-for="item in socialFeatures"
            :label="item"
            :key="item"
            border
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </div>

    <el-divider></el-divider>

    <!-- --------------------------------------------- 已知特征 ----------------------------->
    <div>
      <div class="top">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">已知相关特征：</span>
        <el-checkbox
          v-model="checkAll_2"
          @change="
            (val) => {
              this.knownFeatures = val ? this.allFeatures : [];
            }
          "
          border
          size="small"
          >全选</el-checkbox
        >
      </div>

      <div v-if="peopleFeatures.length > 0">
        <h3 class="featureSubTitle">人口学特征</h3>
        <el-checkbox-group v-model="knownFeatures" @change="changeBox_2()">
          <el-checkbox
            v-for="item in peopleFeatures"
            :label="item"
            :key="item"
            border
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </div>

    <div v-if="physiologicalFeatures.length > 0">
      <h3 class="featureSubTitle">生理学特征</h3>
      <el-checkbox-group v-model="knownFeatures" @change="changeBox_2()">
        <el-checkbox
          v-for="item in physiologicalFeatures"
          :label="item"
          :key="item"
          border
          >{{ item }}</el-checkbox
        >
      </el-checkbox-group>
    </div>

    <div v-if="socialFeatures.length > 0">
      <h3 class="featureSubTitle">社会学特征</h3>
      <el-checkbox-group v-model="knownFeatures" @change="changeBox_2()">
        <el-checkbox
          v-for="item in socialFeatures"
          :label="item"
          :key="item"
          border
          >{{ item }}</el-checkbox
        >
      </el-checkbox-group>
    </div>

    <div class="buttonGroup">
      <el-button @click="backStep()" round>上一步</el-button>
      <el-button type="primary" @click="next()" round>确认</el-button>
    </div>
  </div>
</template>

<script>
import { getRequest } from "@/api/user.js";
import vuex_mixin from "@/components/mixins/vuex_mixin";
export default {
  name: "FeatureSelect",
  props: {
    moduleName: {
      type: String,
      default: "disFactor",
    },
  },
  mixins: [vuex_mixin],
  computed: {},
  data() {
    return {
      allFeatures: [],
      peopleFeatures: [],
      physiologicalFeatures: [],
      socialFeatures: [],
      checkAll_1: false,
      checkAll_2: false,
      checkAll_target: false,
      computeFeatures: [],
      knownFeatures: [],
      targetFeature: [],
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      getRequest("/tTableManager/tablemanager", {
        tableName: this.m_dataset,
      }).then((res) => {
        res.forEach((item) => {
          if (item) {
            if (item.is_demography == 1) {
              this.allFeatures.push(item.field_name);
              this.peopleFeatures.push(item.field_name);
            } else if (item.is_physiological == 1) {
              this.allFeatures.push(item.field_name);
              this.physiologicalFeatures.push(item.field_name);
            } else if (item.is_sociology == 1) {
              this.allFeatures.push(item.field_name);
              this.socialFeatures.push(item.field_name);
            } else if (item.is_zoo_information == 1) {
              console.log(this.moduleName);
              //上面判断是否是标签列
              if (this.moduleName === "disFactor") {
                this.targetFeature.push(item.field_name);
              }
            }
          }
        });
        // 同步vuex里的数据
        this.computeFeatures = this.m_use_features;
        this.knownFeatures = this.m_known_features;
        this.changeBox_1();
        this.changeBox_2();
        if (this.moduleName !== "disFactor") {
          this.targetFeature = this.m_target_feature;
          this.changeBox_target();
        }
      });
    },

    changeBox_1() {
      if (this.computeFeatures.length === this.allFeatures.length) {
        this.checkAll_1 = true;
      } else {
        this.checkAll_1 = false;
      }
    },

    changeBox_2() {
      if (this.knownFeatures.length === this.allFeatures.length) {
        this.checkAll_2 = true;
      } else {
        this.checkAll_2 = false;
      }
    },

    changeBox_target() {
      if (this.targetFeature.length === this.allFeatures.length) {
        this.checkAll_target = true;
      } else {
        this.checkAll_target = false;
      }
    },

    next() {
      if (this.targetFeature.length < 1) {
        alert("该数据没有目标列，请重新选择数据表");
        return;
      }
      if (this.computeFeatures.length < 5) {
        this.$message({
          type:'warning',
          message:'请选择至少5个特征参与运算'
        })
        return;
      }
      this.m_changeTaskInfo({
        use_features: this.computeFeatures,
        known_features: this.knownFeatures,
        target_feature: this.targetFeature,
      });
      this.m_changeStep(this.m_step + 1);
    },

    backStep() {
      this.m_changeStep(this.m_step - 1);
    },
  },
};
</script>

<style scoped>
.Box {
  margin-left: 25vh;
}

.featureTitle {
  font-size: 30px;
  margin-right: 30px;
  margin-bottom: 20px;
}

.featureSubTitle {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
}

.el-checkbox-group {
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(7, 150px);
  grid-gap: 20px;
  grid-template-rows: 20px, 20px;
}

.el-checkbox--small {
  padding-bottom: 10px;
}

.el-checkbox-group .el-checkbox {
  width: 120px;
}

.el-checkbox-group >>> .el-checkbox__label {
  margin-top: 5px;
  line-height: 10px;
  width: 80px;
  overflow: hidden;
  white-space: nowrap; /* 防止文本换行 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.lineStyle {
  color: rgb(100, 172, 231);
  font-weight: 100;
  font-size: 25px;
}

.buttonGroup {
  margin-top: 20px;
}
</style>
