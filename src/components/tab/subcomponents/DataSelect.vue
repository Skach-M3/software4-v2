<template>
  <div>
    <div id="dataList">
      <el-card
        :body-style="{ padding: '0px' }"
        v-for="(item, index) in list"
        :key="index"
        :shadow="chosenData === item.id ? 'always' : 'hover'"
        style="width: 200px"
        @click.native="chosenData = item.id"
      >
        <img src="@/assets/dataset.png" class="image" object-fit="contain" />
        <div style="padding: 14px">
          <span>{{ item.table_name }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="ChangeStep(3)"
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

// TODO:数据预览卡顿， 需要做虚拟列表，动态渲染

<script>
import { getRequest, postRequest } from "@/api/user.js";
import { mapMutations, mapState } from "vuex";
export default {
  name: "DataSelect",

  computed: {
    ...mapState(["dataList"]),
    ...mapState("disFactor", ["disease"]),
  },

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
    ...mapMutations("disFactor", ["ChangeStep"]),

    init() {
      console.log(this.disease);

      for (const item of this.dataList) {
        if (item.disease === this.disease) {
          this.list.push(item);
        }
      }
      console.log(this.list);
      this.dataTotal = this.list.length;
    },

    getData(tablename) {
      this.getData_loading = true;
      getRequest("/DataTable/getInfoByTableName", {
        tableName: tablename,
      }).then((res) => {
        console.log("数据表详细信息👆");
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
  line-height: 12px;
}
#dataList .button {
  padding: 0;
  float: right;
}
</style>
