<template>
  <div>
    <!--==========================     头部按钮     ==============================================================-->
    <div id="top_buttons">
      <div id="load_state">
        <span>涉及病种：</span>
        <el-select v-model="disease" placeholder="请选择">
          <el-option
            v-for="item in options_up"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div id="data_source">
        <span>任务负责人：</span>
        <el-select v-model="principal" placeholder="请选择">
          <el-option
            v-for="item in options_source"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button @click="clearFilter">清除</el-button>

      <div id="top_right_buttons">
        <el-button type="primary" @click="importData">新建任务</el-button>
      </div>

    </div>

    <!--===============================    表格     ==============================================================-->
    <div id="table">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !(value1 || value2) ||
              (data.tableStatus.includes(value1) &&
                data.tableOrigin.includes(value2))
          )
        "
        style="width: 100%"
        stripe
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column label="任务ID" prop="tableName"> </el-table-column>
        <el-table-column label="涉及病种" prop="tableOrigin"> </el-table-column>
        <el-table-column label="负责人" prop="tableStatus"> </el-table-column>
        <el-table-column label="使用数据" prop="dataset"> </el-table-column>
        <el-table-column label="使用模型" prop="tableSize"> </el-table-column>
        <el-table-column label="创建时间" prop="tableDate"> </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    
  </div>
</template>


<script>

import { postRequest } from '@/utils/api';

export default {

  data() {
    return {
      activeName: "first",
      url: 'http://localhost:8080',
      uploadUrl: '/diabete/upload',
      options_up: [//上传选项
        {
          value: "正在上传",
          label: "正在上传",
        },
        {
          value: "上传成功",
          label: "上传成功",
        },
        {
          value: "上传失败",
          label: "上传失败",
        },
      ],
      disease: "",
      options_source: [//数据来源选项
        {
          value: "CSV",
          label: "CSV",
        },
        {
          value: "手工录入",
          label: "手工录入",
        },
        {
          value: "MySQL",
          label: "MySQL",
        },
        {
          value: "EXCEL",
          label: "EXCEL",
        },
        {
          value: "TXT",
          label: "TXT",
        },
      ],
      dialogForm: {
          tableName: "",
          featuresNum: 1,
          fields: [{ name: '', type: '' }],
          rules: {
              tableName: [
                  { required: true, message: '数据表名称不能为空', trigger: 'blur' }
              ],
              numFeatures: [
                  { required: true, message: '特征个数不能为空', trigger: 'blur' },
                  { type: 'integer', message: '特征个数需为整数', trigger: 'blur' },
                  { min: 1, message: '特征个数需>1', trigger: 'blur' }
              ]
          }
      },
      principal: "",
      tableData: [{
        tableName: "心脏病克利夫兰数据集研究",
        tableOrigin: "心脏病",
        tableStatus: "刘医生",
        dataset:"心脏病克利夫兰数据集",
        tableSize: "SF-DRMB",
        tableDate: "2023.6.18"
      }],
      dialogFormVisible: false,
      selectVisible: false,
      search: "",
    };
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    clearFilter() {
      this.value1 = "";
      this.value2 = "";
    },
    getAllData() {
      let tempList=JSON.parse(this.$store.getters.getAllTableData)
          for (let i = 0; i < tempList.length; i++) {
            const obj = {
              tableName: tempList[i].tableName,
              tablePeople: tempList[i].tablePeople,
              tableOrigin: tempList[i].tableOrigin,
              tableSize: tempList[i].tableSize,
              tableDate: tempList[i].startTime,
              tableStatus: tempList[i].tableStatus,
            };
            this.tableData.push(obj);
          }
          
    },
    importData() {
        this.$router.push("/DisFactor");
    },
    generateFields() {
        const numFields = parseInt(this.dialogForm.featuresNum)
        if (!isNaN(numFields)) {
            this.dialogForm.fields = Array.from({ length: numFields }, () => ({ name: '', type: '' }))
        }
    },
    resetForm() {
        this.dialogForm.dataSetName = '';
        this.dialogForm.featuresNum = 1;
        this.dialogForm.fields = [{ name: '', type: '' }];
    },
    // handleSubmit() {
    //     console.log('文件上传中...');
    //     this.$refs.upload.addEventListener('load', this.handleUploadSuccess);
    //     this.$refs.upload.addEventListener('error', this.handleUploadError);
    // },
    // handleUploadSuccess() {
    //     console.log('文件上传成功');
    // },
    // handleUploadError() {
    //     console.log('文件上传失败');
    //   },
    submitUpload() {
        console.log(this.action);
        this.$refs.upload.submit();
            // this.handleSubmit();
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    uploadSuccess() {            //上传成功调用
        alert("上传成功");
      },
      handleError() {           //上传失败调用
          alert("error");
    },
    beforeUpload(file) {         //上传前的验证
        const isCSV = file.type === 'text/csv' || file.type === 'application/vnd.ms-excel';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isCSV) {
            this.$message.error('上传文件仅支持 CSV 格式');
        }
        // if (!isLt2M) {
        //     this.$message.error('上传文件大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        return isCSV;
      },
      submitTable() {
          this.selectVisible = true; 
          const filedMap = {};
          let fieldtemp = this.dialogForm.fields;
          for (let i = 0; i < fieldtemp.length; i++){
            //   let tempName = fieldtemp[i].name;
            //   let tempType = fieldtemp[i].type;
            //   let temp = { [tempName]: tempType };
              filedMap[fieldtemp[i].name] = fieldtemp[i].type;
            //   console.log(tempName, tempType);
            //   console.log(temp);
            //   filedMap[i] = temp;
          }
        //   let filedMap_json = JSON.stringify(filedMap);
            

          console.log("tableName & featuresNum: " + this.dialogForm.tableName + this.dialogForm.featuresNum);
          const params = {   //上传的内容
              tableName: this.dialogForm.tableName,
              columnsNum: this.dialogForm.featuresNum,
              filedMap: filedMap,
          }
          postRequest('diabete/createTable', params).then((response)=>{
              console.log(response);
        })
    }
  },
  created() {
      //存入sessionstorage
      this.getAllData();
  },

}
</script>


<style scoped>
#top_buttons > * {
  display: inline-block;
}
#load_state {
  margin-right: 40px;
}
#data_source {
  margin-right: 20px;
}
#top_right_buttons {
  float: right;
  margin-right: 100px;
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