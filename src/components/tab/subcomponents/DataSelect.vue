<template>
  <div>
    <div id="dataList">
      <el-card
        :body-style="{ padding: '0px' }"
        v-for="(item, index) in list"
        :key="index"
        :shadow="chosenData === item.table_name ? 'always' : 'hover'"
        style="width: 210px"
        @click.native="chosenData = item.table_name"
      >
        <img src="@/assets/dataset.png" class="image" object-fit="contain" />
        <div style="padding: 14px">
          <span>{{ item.table_name }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="next(item.table_name)"
              >确认</el-button
            >
            <el-button
              type="text"
              class="button"
              @click="getData(item.table_name)"
              style="float: left; margin-left: -5px"
              >数据预览</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
    <el-pagination
      @size-change="pageSizeChange()"
      @current-change="currentPageChange()"
      :current-page.sync="currentPage"
      :page-sizes="[3, 4, 5]"
      :page-size.sync="pageSize"
      layout="sizes, prev, pager, next"
      :total="dataTotal"
      :hide-on-single-page="true"
      style="margin-left: 35%; margin-top: 20px"
    >
    </el-pagination>
    <el-table
      :data="patientTable"
      v-if="dataTableVision"
      style="width: 100%; margin-top: 20px"
      max-height="450px"
      border
      stripe
      v-loading="getData_loading"
      element-loading-text="正在获取数据"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column type="index"> </el-table-column>
      <el-table-column
        v-for="(key, index) in Object.keys(patientTable[0])"
        :key="index"
        :label="key"
        :prop="key"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// TODO:大数据预览卡顿， 需要做虚拟列表，动态渲染
import { getRequest } from "@/api/user.js";
import vuex_mixin from "@/components/mixins/vuex_mixin";

export default {
  name: "DataSelect",
  mixins: [vuex_mixin],
  props: {
    moduleName: {
      type: String,
      default: "disFactor",
    },
  },
  computed: {},

  data() {
    return {
      chosenData: "",
      pageSize: 4,
      currentPage: 1,
      dataTotal: 0,
      getData_loading: false,
      dataTableVision: false,
      patientTable: [],
      list: [],
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      for (const item of this.m_dataList) {
        if (item.disease === this.m_disease) {
          this.list.push(item);
        }
      }
      this.dataTotal = this.list.length;
    },

    getData(tablename) {
      this.getData_loading = true;
      getRequest("/DataTable/getInfoByTableName", {
        tableName: tablename,
      }).then((res) => {
        this.patientTable = res.data;
        this.getData_loading = false;
        this.dataTableVision = true;
      });
    },

    // pageSizeChange() {
    //   getRequest(
    //     `DataManager/data/heart?page=${this.currentPage}&pageSize=${this.pageSize}`
    //   ).then((res) => {
    //     console.log("新的datalist👉", res.list);
    //     this.dataList = res.list;
    //     this.dataTotal = res.total;
    //   });
    // },

    // currentPageChange() {
    //   getRequest(
    //     `DataManager/data/heart?page=${this.currentPage}&pageSize=${this.pageSize}`
    //   ).then((res) => {
    //     console.log("新的datalist👉", res.list);
    //     this.dataList = res.list;
    //     this.dataTotal = res.total;
    //   });
    // },
    next(name) {
      this.chosenData = name;
      this.m_changeStep(3);
      this.m_changeTaskInfo({ dataset: this.chosenData });
    },
  },
};
</script>

<style scoped>
#dataList {
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  margin-left: 100px;
}

.bottom {
  margin-top: 13px;
  padding-bottom: 10px;
  line-height: 15px;
}
#dataList .button {
  padding: 0;
  float: right;
}
</style>
