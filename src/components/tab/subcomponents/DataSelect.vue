<template>
  <div>
    <div class="content">
      <div class="left_tree">
        <div class="tipInfo">
          <h3>可选数据</h3>
          <span class="statistic">
            一级病种: {{ diseaseNum }} 个 
          </span>
          <span class="statistic"> 
            数据表: {{ datasetNum }} 个
          </span>
        </div>
        <hr class="hr-dashed">
        <el-tree ref="tree" :data="treeData" :show-checkbox="false" node-key="id" default-expand-all
          :expand-on-click-node="false" :check-on-click-node="true" :highlight-current="true" @node-click="changeData"
          @check="changeData" @check-change="handleCheckChange">
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <span v-if="data.catLevel == 1" style="font-weight:bold;font-size:15px;color:#252525">{{ node.label }}</span>
            <span v-else>{{ node.label }}</span>
          </span>
        </el-tree>

      </div>
      <div class="right_table">
        <el-card class="right_table_topCard">
          <div style="height: 30px;padding-left:5px">
            <h3 style="margin:-20px">数据预览</h3>
          </div>
          <div class="describe_content">
            <p>
              <i class="el-icon-folder"></i> 数据集名称:<span style="font-weight:bold;font-size:18px;color:#252525">{{ showDataForm.tableName }}</span>
              <i class="el-icon-user"></i> 创建人:<span>{{ showDataForm.createUser }}</span>
              <i class="el-icon-time"></i> 创建时间:<span>{{ showDataForm.createTime }}</span>
              <i class="el-icon-finished"></i> 样本个数:<span>{{ showDataForm.sampleNum }}</span>
              <i class="el-icon-finished"></i> 特征个数:<span>{{ showDataForm.featureNum }}</span>
              <!-- <i class="el-icon-folder-opened"></i> 所属类别:<span>{{ showDataForm.classPath }}</span> -->
            </p>
          </div>
          
          <div class="tableDataCSS" v-loading="table_loading" element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.05)">
            <div class="tablePlaceholder" v-if="tableData.length <1 && !table_loading">请在左侧选择数据</div>
            <el-table :data="tableData" stripe class="custom-table" max-height="550" :fit="false" v-if="tableData.length>0" :header-cell-style="{background:'#eee',color:'#606266'}">
              <el-table-column v-for="(value, key) in tableData[0]" :key="key" :prop="key" :label="key" :width="colWidth" sortable>
                <template slot-scope="{ row }">
                  <div class="truncate-text">{{ row[key] }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          
        </el-card>

        <div class="buttonGroup">
          <el-button @click="backStep()" round>上一步</el-button>
          <el-button type=primary round :disabled="tableData.length < 1" @click="next(showDataForm.classPath, showDataForm.tablename)">下一步</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// TODO:大数据预览卡顿， 需要做虚拟列表，动态渲染

import { getCategory } from "@/api/category";
import { getTableDes, getTableData } from "@/api/tableDescribe.js";
import vuex_mixin from "@/components/mixins/vuex_mixin";
import {getRequest} from "@/api/user"
export default {
  name: "DataSelect",
  mixins: [vuex_mixin],
  props: {
    moduleName: {
      type: String,
      default: "disFactor",
    },
  },
  computed: {
    colWidth() {
      let arr = Object.keys(this.tableData[0])
      if (arr.length <= 15) {
        return 90;
      }
      else {
        return 65;
      }
    }
  },

  data() {
    return {
      treeData: [],
      nodeData: {},
      tableData: [],
      showDataForm: {
        createUser: '',
        createTime: '',
        classPath: '',
        tablename: '',
        sampleNum: '',
        featureNum: ''
      },
      diseaseNum:0,
      datasetNum:0,
      table_loading:false,
    };
  },

  created() {
    this.getCatgory();
    this.$notify.success({
      title: '提示',
      message: '请选择数据集进行下一步操作！',
      showClose: false
    });
  },

  methods: {


    next(classPath, name) {
      let path = classPath.split("/");
      if (path[0] != "公共数据集") {
        this.m_changeTaskInfo({ disease: path[0], dataset: name ,is_common: false });
      }
      else {
        this.m_changeTaskInfo({ disease: path[path.length - 1], dataset: name, is_common: true });
      }
      this.m_changeStep(3);
    },

    backStep() {
      this.m_changeStep(this.m_step - 1);
    },


    handleCheckChange(data, checked) {
      if (checked) {
        this.$refs.tree.setCheckedKeys([data.id])
      }
    },


    changeData(data) {
      if (data.isLeafs == 1) {
        this.showDataForm.featureNum = ''
        this.showDataForm.sampleNum = ''
        this.table_loading = true;
        this.tableData=[];
        //获取描述信息
        let that=this;
        that.getTableDescribe(data.id)
        //获取数据信息
        that.getTableData(data.id, data.label)
        
      }
    },
    getTableDescribe(id) {
      getTableDes("/api/tableDescribe", id).then(response => {
        if (response.data != null) {
          let res = JSON.parse(response.data);
          this.showDataForm.createUser = res.createUser;
          this.showDataForm.createTime = res.createTime;
          this.showDataForm.classPath = res.classPath;
          this.showDataForm.tablename = res.tableName;
        }
      })
        .catch(error => {
          console.log("错误", error)
        });
    },
    getTableData(tableId, tableName) {
      getTableData("/api/getTableData", tableId, tableName).then(response => {   // 获取表数据
        this.tableData = response.data;
        console.log(this.tableData);
        const fields = Object.keys(this.tableData[0]);
        this.showDataForm.sampleNum = this.tableData.length;
        this.showDataForm.featureNum = fields.length;
        this.table_loading = false;
      })
        .catch(error => {
          console.log(error);
        })
    },

    getCatgory() {
      getCategory("/api/category").then((response) => {
        console.log(response.data);
        // 如果是多疾病任务，只能选择公共数据集
        if(this.moduleName == "factorDis"){
          const tempData = this.filterCommonAndMutiData(response.data);
          // console.log(tempData);
          this.treeData = tempData;
          // 为什么find不能用
          // const publicNode = response.data.find((node)=>{
          //   node.id == '1010';
          // })
          // console.log(publicNode); 
          // this.treeData = this.filterTree(publicNode)
        }
        else{
          this.treeData = this.filterTree(response.data);
        }
        console.log(this.treeData);
        // 获取病种和数据集总数
        this.diseaseNum = response.data[0].children.length + response.data[1].children.length;
        getRequest("/api/getTableNumber").then((res)=>{
          if(res.code == 200)
            this.datasetNum = res.data;
        })
        if(this.treeData.length<1){
          this.$message({
            showClose: true,
            type: "warning",
            message: "暂无可用数据",
          });
        }

      })
    },

    // 递归过滤树结构
    filterTree(nodes) {
      if(nodes.length < 1) return;
      return nodes.filter(node => {
        if (node.isLeafs === 1) {
          return true;
        } else if (node.children && node.children.length > 0) {
          node.children = this.filterTree(node.children);
          return node.children.length > 0;
        }
        return false;
      });
    },

    filterCommonAndMutiData(data) {
    // 过滤出"公共数据集下的多疾病"
    const publicDatasets = data.filter(item => item.id === "1010");
    const publicDatasets2 = publicDatasets[0].children.filter( item => item.id == "1775096840182611969")
    return this.filterTree(publicDatasets2);

}





  },
};
</script>

<style scoped>
.buttonGroup {
  width: 200px;
  margin-top: 35px;
  margin-left: auto;
  margin-right: auto;
}

.content {
  position: absolute;
  width: 100%;
  height: 88%;
}

.left_tree {
  display: inline-block;
  height: 85%;
  width: 15%;
  overflow: auto;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  margin-top: -2%;
}

.tipInfo{
  background-color: rgba(124, 124, 124, 0.1);
  height: 50px;
  text-align: center;
}
.tipInfo .statistic{
  font-size: 13px;
  color: #585858;
}
.hr-dashed {
  border: 0;
  border-top: 1px dashed #899bbb;
}
  
h3{
  color: #3d3d3d;
  text-align:center
}

.right_table {
  display: inline-block;
  width: 75%;
  position: absolute;
  overflow: auto;
  margin-top: -2.75%;
  height: 88%;
}

.tablePlaceholder{
  height: 100%;
  text-align: center;
  line-height: 550px;
  background-color: rgba(179, 178, 178, 0.144);
  font-weight: bold;
  color: rgba(58, 57, 57, 0.651);
  user-select:none;
}

.tableDataCSS {
  width: 100%;
  height: 550px;
}

.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.right_table_topCard {
  padding: 0;
  height: auto;
  width: 90%;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  top: 2%;
  left: 1%;
}

.describe_content {
  display: inline-block;
  width: 70%;
  margin-bottom: 20px;
}

.describe_content span {
  margin: 10px;
}
</style>
