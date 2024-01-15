<template>
  <div class="Box">
    <!-- ------------------------------------选择目标特征 ------------------------------->
    <!-- <div v-if="moduleName !== 'disFactor'">
      <div class="top">
        <span class="lineStyle">▍</span
        ><span class="featureTitle">选择目标特征：</span> -->
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
    <!-- </div>
      <div v-if="peopleFeatures.length > 0">
        <h3 class="featureSubTitle">人口学特征</h3>
        <el-checkbox-group v-model="targetFeature" @change="changeBox_target()">
          <el-checkbox
            v-for="item in peopleFeatures"
            :label="item"
            :key="item"
            border
          >
            <el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay=200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover>
          </el-checkbox>
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
          >
            <el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay=200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover></el-checkbox
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
            ><el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay=200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover></el-checkbox
          >
        </el-checkbox-group>
      </div>
      <el-divider></el-divider>
    </div> -->

    <!-- ------------------------------------- 参与运算特征 ---------------------------->
    <!-- <div>
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
            ><el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay=200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover></el-checkbox
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
            ><el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay=200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover></el-checkbox
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
            ><el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay= 200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover></el-checkbox
          >
        </el-checkbox-group>
      </div>
    </div>

    <el-divider></el-divider> -->

    <!-- --------------------------------------------- 已知特征 ----------------------------->
    <!-- <div>
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
            ><el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay=200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover></el-checkbox
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
          ><el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay=200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover></el-checkbox
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
          ><el-popover
              placement="top-end"
              width="150"
              :title="item"
              trigger="hover"
              :content="getDeficiency(item)"
              :open-delay=200
            >
              <span slot="reference">{{ item }}</span>
            </el-popover></el-checkbox
        >
      </el-checkbox-group>
    </div> -->
    <div class="content">
      <div class="left_tree">
        <el-tree :data="featureSelectTree" show-checkbox node-key="id" ref="tree" highlight-current 
         @check="getCheckedNodes" default-expend-keys=[1]
        >
        </el-tree>
      </div>
      <div class="right_table">
        <div class="specify">
          <p>特征下方进度条为特征填充度</p>
        </div>
        <!-- 选择作为标签的特征(因变量) -->
        <div class="select_feature_var">
          <div class="select_feature_var_top">
            <h3 class="title">选择作为标签的特征(因变量)</h3>
            <el-select v-model="value" placeholder="请选择" class="selection">
              <el-option v-for="item in feature_select_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select_feature_check_boxs">
            <el-checkbox-group v-model="checked_dependent_variables">
              <div v-for="item in all_features" :key="item.id" v-show="item.status == 0 || item.status == 1"> <el-checkbox
                  :label="item" @change="item.status = 1">{{ item.label }}
                </el-checkbox> <el-progress :percentage="item.fill_rate * 100"
                  :color="changeProgressColor(item.fill_rate * 100)"></el-progress></div>
            </el-checkbox-group>
          </div>
          <el-pagination @current-change="currentPageChange()" :current-page.sync="currentPage" :page-size.sync="pageSize"
            layout="total, prev, pager, next" :total="dataTotal" style="margin-left: 5%; margin-top: 20px"
            :hide-on-single-page="true">
          </el-pagination>
        </div>
        <!--  选择危险因素(自变量)-->
        <div class="select_feature_var">
          <div class="select_feature_var_top">
            <h3 class="title">选择危险因素(自变量)</h3>
            <el-select v-model="value" placeholder="请选择" class="selection">
              <el-option v-for="item in feature_select_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select_feature_check_boxs">
            <el-checkbox-group v-model="checked_independent_variables">
              <div v-for="item in all_features" :key="item.id" v-show="item.status == 0 || item.status == 2"> <el-checkbox
                  :label="item" @change="item.status = 2">{{ item.label }}
                </el-checkbox> <el-progress :percentage="item.fill_rate * 100"
                  :color="changeProgressColor(item.fill_rate * 100)"></el-progress></div>
            </el-checkbox-group>
          </div>
          <el-pagination @current-change="currentPageChange()" :current-page.sync="currentPage" :page-size.sync="pageSize"
            layout="total, prev, pager, next" :total="dataTotal" style="margin-left: 5%; margin-top: 20px"
            :hide-on-single-page="true">
          </el-pagination>
        </div>
        <!--  已选标签特征-->
        <div class="select_feature_var">
          <div class="select_feature_var_top">
            <h3 class="title">已选标签特征</h3>
            <el-select v-model="value" placeholder="请选择" class="selection">
              <el-option v-for="item in feature_select_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select_feature_check_boxs">
            <el-checkbox-group v-model="checked_dependent_variables">
              <div v-for="item in checked_dependent_variables" :key="item.id"> <el-checkbox :label="item"
                  @change="item.status = 0">{{ item.label }}
                </el-checkbox> <el-progress :percentage="item.fill_rate * 100"
                  :color="changeProgressColor(item.fill_rate * 100)"></el-progress></div>
            </el-checkbox-group>
          </div>
          <el-pagination @current-change="currentPageChange()" :current-page.sync="currentPage" :page-size.sync="pageSize"
            layout="total, prev, pager, next" :total="dataTotal" style="margin-left: 5%; margin-top: 20px"
            :hide-on-single-page="true">
          </el-pagination>
        </div>
        <!-- 已选危险因素 -->
        <div class="select_feature_var">
          <div class="select_feature_var_top">
            <h3 class="title">已选危险因素</h3>
            <el-select v-model="value" placeholder="请选择" class="selection">
              <el-option v-for="item in feature_select_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select_feature_check_boxs">
            <el-checkbox-group v-model="checked_independent_variables">
              <div v-for="item in checked_independent_variables" :key="item.id"> <el-checkbox :label="item"
                  @change="item.status = 0">{{ item.label
                  }}
                </el-checkbox> <el-progress :percentage="item.fill_rate * 100"
                  :color="changeProgressColor(item.fill_rate * 100)"></el-progress></div>
            </el-checkbox-group>
          </div>
          <el-pagination @current-change="currentPageChange()" :current-page.sync="currentPage" :page-size.sync="pageSize"
            layout="total, prev, pager, next" :total="dataTotal" style="margin-left: 5%; margin-top: 20px"
            :hide-on-single-page="true">
          </el-pagination>
        </div>
        <el-button type="warning" @click="resetButton">重制</el-button>
      </div>
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
import { featureSelectTree } from "@/components/tab/featureSelectTree";
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
      //用于存储左侧特征选择树值
      featureSelectTree: [],
      //特征选择数的备份，用于删除叶子节点
      filteredTree:[],
      //用于存储右侧特征条件选项
      feature_select_options: [
        { value: 0, label: "全部特征" },
        { value: 1, label: "疾病标准特征" },
        { value: 2, label: "非疾病标准特征" }
      ],
      //用于存储所有特征
      all_features: [],
      //用于存储已选的因变量（已选标签特征）
      checked_dependent_variables: [],
      //用于存储已选的因变量（已选危险因素）
      checked_independent_variables: [],
      //分页数据
      pageSize: 10,
      currentPage: 1,
      dataTotal: 10,
      value: '',
      templist: []
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
            } else if (item.is_label == 1) {
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

      //加载虚拟特征选择数据
      this.featureSelectTree = featureSelectTree;
      //获取dependent_variables
      this.featureSelectTree.forEach(root => {
        this.extractLeafNodes(root);
      });
      console.log(this.all_features);
      // // 复制树形结构，以免修改原始数据
      // this.filteredTree = JSON.parse(JSON.stringify(featureSelectTree));

      // // 过滤非叶子节点
      // this.filteredTree.forEach(root => {
      //   this.filterNonLeafNodes(root);
      // });
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

    getDeficiency() {
      let rate = (Math.random() * 100).toFixed(3);
      return `缺失率：${rate}%`;
    },

    next() {
      if (this.targetFeature.length < 1) {
        alert("该数据没有标签特征，请重新选择或上传数据表");
        return;
      }
      if (this.computeFeatures.length < 5) {
        this.$message({
          type: "warning",
          message: "请选择至少5个特征参与运算",
        });
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

    //获得dependent_variables
    extractLeafNodes(tree) {
      if (tree.children) {
        tree.children.forEach(child => {
          this.extractLeafNodes(child);
        });
      } else {
        // 叶子节点
        // this.dependent_variables.push(tree);
        // this.independent_variables.push(tree);
        this.all_features.push(tree);
      }
    },

    changeProgressColor(rate) {
      if (rate < 30) {
        return 'RGB(230,162,60)'
      }
      else if (rate < 60) {
        return 'RGB(245,108,108)'
      }
      else if (rate < 90) {
        return 'RGB(64,158,255)'
      }
      else {
        return 'RGB(103,194,58)'
      }
    },
    //分页函数
    currentPageChange() {

    },
    filterNonLeafNodes(tree) {
      if (tree.children) {
        // 过滤掉没有子节点的非叶子节点
        tree.children = tree.children.filter(child => child.children);

        // 递归处理子节点
        tree.children.forEach(child => {
          this.filterNonLeafNodes(child);
        });
      }
    },
    getCheckedNodes() {
      //获得所有选中的节点
      const checkeList = this.$refs.tree.getCheckedNodes();
      console.log(checkeList);
      //如果没有节点选中，则让all_features恢复所有值
      if(checkeList.length === 0){
        this.all_features = []
        this.featureSelectTree.forEach(root => {
        this.extractLeafNodes(root);
      });
      }
      //或者过滤
      else{
        this.all_features = checkeList.filter(node => node.isLeaf===true);
      }
    },
    resetButton(){
        for(let i=0;i<this.checked_dependent_variables.length;i++){
          this.checked_dependent_variables[i].status=0;
        }
        for(let i=0;i<this.checked_independent_variables.length;i++){
          this.checked_independent_variables[i].status=0;
        }
        this.checked_dependent_variables=[];
        this.checked_independent_variables=[];
    }
}
};
</script>

<style scoped>
.Box {
  /* margin-left: 25vh; */
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

.el-checkbox span {
  display: block;
  width: 100px;
}

/* 使用popover以后省略号就没用了 */
.el-checkbox-group>>>.el-checkbox__label {
  margin-top: 5px;
  line-height: 10px;
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  /* 防止文本换行 */
  text-overflow: ellipsis;
  /* 显示省略号 */
}

.lineStyle {
  color: rgb(100, 172, 231);
  font-weight: 100;
  font-size: 25px;
}

.buttonGroup {
  margin-top: 20px;
}

.content {
  width: 100%;
  height: auto;
}

.left_tree {
  display: inline-block;
  height: auto;
  width: 13%;
  border-radius: 3px;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
}

.right_table {
  display: inline-block;
  height: auto;
  width: 80%;
  position: absolute;
}

.specify {
  margin-top: 1px;
  width: 90%;
  height: 5%;
  text-align: center;
  background-color: #e6e6e6;
}

.select_feature_var {
  margin-top: 1px;
  width: 90%;
  height: auto;
}

.select_feature_var_top {
  width: 100%;
  /* position: absolute; */
}

.title {
  display: inline-block;
  margin-left: 3%;
}

.selection {
  margin-left: 2%;
  position: relative;
  bottom: 5px;
}

.select_feature_check_boxs {
  width: 100%;
  height: auto;
  margin-left: 5%;
}

.select_feature_check_boxs>>>.el-checkbox__label {
  overflow: visible;
}</style>
