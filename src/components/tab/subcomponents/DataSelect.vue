<template>
  <div>
    <div class="content">
      <div class="left_tree">

        <el-tree ref="tree" :data="treeData" :show-checkbox="false" node-key="id" default-expand-all
          :expand-on-click-node="false" :check-on-click-node="true" :highlight-current="true" @node-click="changeData"
          @check="changeData" @check-change="handleCheckChange">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>

      </div>
      <div class="right_table">
        <el-card class="right_table_topCard">
          <div class="describe_content">
            <h3>数据集信息</h3>
            <p style="margin-top:0.5%">
              <i class="el-icon-user"></i>创建人: <span>{{ showDataForm.createUser }}</span>
              <i class="el-icon-time"></i>创建时间: <span>{{ showDataForm.createTime }}</span>
              <i class="el-icon-folder-opened"></i>所属类别: <span>{{ showDataForm.classPath }}</span>
              <i class="el-icon-folder-opened"></i>数据集名称: <span>{{ showDataForm.tablename }}</span>
            </p>
          </div>
          <div class="buttom">
            <el-button type=success @click="next(showDataForm.classPath, showDataForm.tablename)">确认</el-button>
          </div>

          <el-table :data="tableData" stripe style="width: 100%" class="custom-table" max-height="700" :fit="false" v-if="tableData.length>0">
            <el-table-column v-for="(value, key) in tableData[0]" :key="key" :prop="key" :label="key" :width="colWidth">
              <template slot-scope="{ row }">
                <div class="truncate-text">{{ row[key] }}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <div class="buttonGroup">
          <el-button @click="backStep()" round>上一步</el-button>
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
        tablename: ''
      },
    };
  },

  created() {
    this.getCatgory();
    // this.getTableDescribe("1005")
    // this.getTableData("1005", "copd");
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
      })
        .catch(error => {
          console.log(error);
        })
    },

    getCatgory() {
      getCategory("/api/category").then((response) => {
        console.log(response.data);
        this.treeData = this.filterTree(response.data);

      })
    },

    // 递归过滤树结构
    filterTree(nodes) {
      return nodes.filter(node => {
        if (node.isLeafs === 1) {
          return true;
        } else if (node.children && node.children.length > 0) {
          node.children = this.filterTree(node.children);
          return node.children.length > 0;
        }
        return false;
      });
    }




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

.buttonGroup {
  width: 200px;
  margin-top: 18px;
  margin-left: auto;
  margin-right: auto;
}

.content {
  width: 100%;
  height: auto;
}

.left_tree {
  display: inline-block;
  height: 80%;
  width: 15%;
  overflow: auto;
  border-radius: 3px;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
}

.right_table {
  display: inline-block;
  width: 75%;
  position: absolute;
  overflow: auto;
  margin-top: -2%;
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
  border-radius: 3px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  top: 2%;
  left: 1%;
}

.describe_content {
  display: inline-block;
  width: 70%;
}

.buttom {
  display: inline-block;
  width: 20%;
  position: relative;
  right: -20%;
  bottom: 10px;
}

.describe_content span {
  margin: 10px;
}
</style>
