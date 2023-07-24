<template>
  <div>
    <div id="dataList">
      <el-card 
      :body-style="{ padding: '0px'}" 
      v-for="(item,index) in dataList"
      :key=index
      :shadow="chosenData === item.id ? 'always':'hover'" 
      style="width:200px"
      @click.native="chosenData = item.id" 
      >
        <img src="@/assets/dataset.png" class="image" object-fit="contain">
        <div style="padding: 14px;">
          <span>{{item.chinesename}}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="predict(item.tablename);step = 3">预测该表</el-button>
            <el-button type="text" class="button" @click="getData(item.tablename)" style="float:left; margin-left:-5px">数据预览</el-button>
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
      style="margin-left:35%;margin-top:20px">
    </el-pagination>
    <el-table
    :data="patientTable"
    style="width: 100%; margin-top: 20px;"
    max-height="450px"
    border
    stripe
    v-loading="getData_loading"
    element-loading-text="正在获取数据"
    element-loading-spinner="el-icon-loading"
    >
      <!-- <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        v-for="(key,index) in Object.keys(patientTable[0])"
        :key="index"
        :label="key"
        :prop="key">
      </el-table-column> -->
      
    </el-table>

  </div>
</template>

<script>
import {postRequest} from "@/api/user.js"
export default {
  name: "DataSelect",
  data (){
    return {
      chosenData: "",
      pageSize: 4,
      currentPage: 1,
      dataTotal: 0,
      getData_loading: false,
      patientTable:[],
      
      dataList:[{
        id: 'heart1',
        chinesename: "心脏病一",
        tableName: "heart1",
      },
      {
        id: 'heart2',
        chinesename: "心脏病二",
        tableName: "heart2",
      },
      {
        id: 'heart3',
        chinesename: "心脏病三",
        tableName: "heart3",
      }
      ],
    }
  },

  methods:{
    getData(id){
      this.getData_loading = true;
      postRequest("TableManager/getInfoByTableName",id).then((res)=>{
        this.patientTable = res.data;
        this.getData_loading = false;
        this.dataTableVision = true;
      })
    },
  }
}
</script>

<style scoped>
  #dataList{
    width: 80%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin-left: 100px
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