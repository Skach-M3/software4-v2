<template lang="">
  <div>
    <div class="left_tree">
      <el-button
        type="success"
        class="add_button"
        @click="dialogDiseaseVisible = true"
        >添加病种</el-button
      >
      <el-dialog
        title="提示"
        :visible.sync="dialogDiseaseVisible"
        width="30%"
        @close="cleanInput()"
      >
        <span>
          请输入新病种名称：<el-input
            placeholder="请输入内容"
            v-model="diseaseName"
            class="nameInput"
          ></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cleanInput()">取 消</el-button>
          <el-button type="primary" @click="addDisease()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogDiseaseVisible2"
        width="30%"
        @close="cleanInput()"
      >
        <span>
          请输入新病种名称：<el-input
            placeholder="请输入内容"
            v-model="diseaseName"
            class="nameInput"
          ></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cleanInput()">取 消</el-button>
          <el-button type="primary" @click="appendDisease()">确 定</el-button>
        </span>
      </el-dialog>
      <el-tree
        ref="tree"
        :data="treeData"
        :show-checkbox="false"
        node-key="id"
        default-expand-all
        :expand-on-click-node="true"
        :check-on-click-node="true"
        @node-click="changeData"
        @check-change="handleCheckChange"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-popconfirm
              confirm-button-text="新病种"
              cancel-button-text="特征表"
              title="请选择添加的文件"
              cancel-button-type="primary"
              @confirm="dialogDiseaseVisible2 = true"
              @cancel="addCharacteration()"
            >
              <el-button
                v-if="!data.isLeafs"
                icon="el-icon-folder-add"
                size="mini"
                type="text"
                slot="reference"
                @click="markNode(data)"
              >
              </el-button>
            </el-popconfirm>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="() => remove(node, data)"
            >
            </el-button>
          </span>
        </span>
      </el-tree>
      <el-dialog
        title="特征选择"
        :visible.sync="characterVisible"
        width="50%"
        append-to-body
        @close="cleanCheckBox()"
      >
        <span style="margin-left: 20px">
          请输入新病种名称：<el-input
            placeholder="请输入内容"
            v-model="diseaseName"
            class="nameInput"
          ></el-input>
        </span>
        <el-container style="margin-top: 10px">
          <el-aside width="180px">
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="exchangeCharacterList(0)">
                <span slot="title">人口学</span>
              </el-menu-item>
              <el-menu-item index="3" @click="exchangeCharacterList(1)">
                <span slot="title">生理指标</span>
              </el-menu-item>
              <el-menu-item index="4" @click="exchangeCharacterList(2)">
                <span slot="title">行为学</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              v-model="checkedCharacter"
              @change="handleCheckedCharacterChange"
            >
              <el-checkbox
                v-for="item in characterOptList"
                :label="item"
                :key="item.characterId"
                style="margin-top: 10px"
                >{{ item.chName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-main>
        </el-container>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="append()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="right_table">
      <template>
        <!-- <el-select v-model="showValue" style="left: 1%" @change="filterData">
          <el-option
            v-for="item in diseaseNormalOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </template>
      <el-card class="right_table_topCard">
        <el-table :data="filerInfoData" style="width: 100%" max-height="700px" stripe>
          <el-table-column v-for="(value, key) in filerInfoData[0]" :key="key" :prop="key" :label="key">
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editTable(scope.row,scope.rowid)"></el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-card>
      <el-dialog :title="tableForm_new.field_name" :visible.sync="tableFormVisable" width="40%" :before-close="handleClose">
        <el-form ref="tableFormRef" :model="tableForm_new" label-width="160px" style="margin-left: 15%">
          <el-form-item label="特征描述：" prop="characterization">
            <el-input v-model="tableForm_new.characterization" style="width: 49%"></el-input>
          </el-form-item>
          <el-form-item label="所属疾病：" prop="in_disease">
            <el-select v-model="tableForm_new.in_disease">
              <el-option-group v-for="group in diseaseOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="是否为疾病标准指标：" prop="is_standard">
            <el-select ref="is_standard" v-model="tableForm_new.standard">
              <el-option v-for="item in standardOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型：" prop="data_type">
            <el-select ref="data_type" v-model="tableForm_new.data_type">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpdate">修改</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRequest, postRequest } from "@/utils/api";
// import { tableInfoData } from "@/components/tab/TableData.js";
import { getTableData } from "@/api/tableDescribe.js";
import { getFetures } from "@/api/feature.js";
import { addDisease , removeCate } from "@/api/category";

export default {
  data() {
    return {
      // 获取虚拟树形结构数据
      treeData: [],
      // 获取虚拟表格数据
      tableInfoData: [],

      treeDialogData: [],

      filerInfoData: [],

      dialogDiseaseVisible: false,

      dialogDiseaseVisible2: false,

      characterVisible: false,

      nodeData: {},

      characterOptListId: 0,

      characterOptList_Arr: [],

      checkedCharacter_Arr: [],

      nowListIndex: 0,

      // 多选框
      checkAll: false,
      checkedCharacter: [],
      characterOptList: [],

      diseaseName: "",
      tableNameList: [],
      fileds: [],
      //tableData: [],
      isView: false,
      rowid: 0,
      pagenum: 1,
      pagesize: 10,
      total: 0,
      tempTableName: "",
      tempTbaleType: "",
      tableForm: {
        field_name: "",
        characterization: "",
        in_disease: "",
        category: "",
        standard: "",
        is_standard: 1,
        data_type: "",
      },
      tableForm_new: {
        field_name: "",
        characterization: "",
        in_disease: "",
        category: "",
        standard: "",
        is_standard: 1,
        data_type: "",
      },
      tableFormVisable: false,
      showValue: "疾病标准特征",
      standardOptions: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      typeOptions: [
        {
          value: "1",
          label: "int",
        },
        {
          value: "2",
          label: "float",
        },
        {
          value: "3",
          label: "double",
        },
        {
          value: "4",
          label: "bool",
        },
        {
          value: "5",
          label: "string",
        },
      ],
      diseaseNormalOptions: [
        {
          value: "1",
          label: "全部特征",
        },
        {
          value: "2",
          label: "疾病标准特征",
        },
        {
          value: "3",
          label: "非疾病标准特征",
        },
      ],
      diseaseOptions: [
        {
          label: "糖尿病",
          options: [
            {
              value: "1",
              label: "一型糖尿病",
            },
            {
              value: "2",
              label: "二型糖尿病",
            },
          ],
        },
        {
          label: "肺病",
          options: [
            {
              value: "3",
              label: "xxx肺病",
            },
            {
              value: "4",
              label: "xx肺病",
            },
          ],
        },
      ],
    };
  },
  created() {
    // this.filerInfoData = this.tableInfoData.filter(
    //   (item) => item.is_standard === 1
    // );
    this.getCatgory();
  },
  methods: {
    // 添加新的病种
    // payload：疾病名，特征列表
    // respond：新的病种列表
    append() {
      let k = 0;
      for (let j = 0; j < this.checkedCharacter_Arr.length; j++) {
        for (let i = 0; i < this.checkedCharacter_Arr[j].length; i++) {
          this.fileds[k] = this.checkedCharacter_Arr[j][i].featureName
          k++;
        }
      }
      console.log("特征列表:")
      console.log(this.fileds)
      postRequest("/filed/updateFiled", {
        diseaseName: this.diseaseName,
        fileds: this.fileds
      }).then((res) => {
        console.log(res);
      });
      // 发送请求新增一个病种信息（目录结构）
      let catagoryNode = {
        label: this.diseaseName,
        catLevel: this.catLevel+1,
        parentId: this.nodeData.id,
        isLeafs: 1,
        isCommon: 0,
        path: this.nodeData.path + "/" + this.diseaseName,
        isDelete: 0,
        children: []
      };

      let catagoryNodeJSON = JSON.stringify(catagoryNode);
      addDisease("/api/addFeature2", catagoryNodeJSON).then(response => {
        this.getCatgory(); //刷新目录结构
        console.log(response.data);
      }).catch(error => {
        alert("新增疾病目录错误" + error)
      })
      this.nodeData = {};
      this.cleanInput();
      this.characterId = 0;
      this.characterVisible = false;
      this.characterOptList_Arr = [];
      this.checkedCharacter_Arr = [];
    },

    appendDisease() {
      // 发送请求新增一个病种信息（目录结构）
      let catagoryNode = {
        label: this.diseaseName,
        catLevel: this.nodeData.catLevel+1,
        parentId: this.nodeData.id,
        isLeafs: 0,
        isCommon: 0,
        path: this.nodeData.path + "/" + this.diseaseName,
        isDelete: 0,
        children: []
      };

      let catagoryNodeJSON = JSON.stringify(catagoryNode);
      addDisease("/api/appendDisease2", catagoryNodeJSON).then(response => {
        this.getCatgory(); //刷新目录结构
        console.log(response.data);
      }).catch(error => {
        alert("新增疾病目录错误" + error)
      })
      this.nodeData = {};
      this.cleanInput();
      this.dialogDiseaseVisible2 = false;
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      removeCate("/api/category/remove2",data).then(response=>{ // data就是要删除的目录信息
        console.log(response.data);
      }).catch(error=>{
        console.log(error);
      })
    },

    addDisease() {
      // 发送请求新增一个病种信息（目录结构）
      let catagoryNode = {
        label: this.diseaseName,
        catLevel: 1,
        parentId: 0,
        isLeafs: 0,
        isCommon: 0,
        path: this.diseaseName,
        isDelete: 0,
        children: []
      };

      let catagoryNodeJSON = JSON.stringify(catagoryNode);
      addDisease("/api/addDisease2", catagoryNodeJSON).then(response => {
        this.getCatgory(); //刷新目录结构
        console.log(response.data);
      }).catch(error => {
        alert("新增疾病目录错误" + error)
      })
      this.cleanInput();
    },
    getCatgory() {
      getRequest("/api/category2").then((response) => {
        this.treeData = response.data;
        console.log(typeof (this.treeData));
        console.log(this.treeData);
      });
    },

    addCharacteration() {
      getFetures("/api/feature/getFeatures", 0).then(response => {
        console.log("特征为：");
        console.log(response.data);
        this.characterOptList_Arr[0] = response.data;
        this.checkedCharacter_Arr[0] = [];
        this.characterOptList = response.data;
        this.checkedCharacter = this.checkedCharacter_Arr[0]
      }).catch(error => {
        console.log(error);
      })
      getFetures("/api/feature/getFeatures", 2).then(response => {
        console.log("特征为：");
        console.log(response.data);
        this.characterOptList_Arr[1] = response.data;
        this.checkedCharacter_Arr[1] = [];
      }).catch(error => {
        console.log(error);
      })
      getFetures("/api/feature/getFeatures", 3).then(response => {
        console.log("特征为：");
        console.log(response.data);
        this.characterOptList_Arr[2] = response.data;
        this.checkedCharacter_Arr[2] = [];
      }).catch(error => {
        console.log(error);
      })
      this.characterVisible = true;
    },

    handleCheckChange(data, checked) {
      if (checked) {
        this.$refs.tree.setCheckedKeys([data.id]);
      } else {
        this.dataTableShow = false;
      }
    },

    getTableData(tableId, tableName) {
      getTableData("/api/getTableData", tableId, tableName)
        .then((response) => {
          // 获取表数据
          this.filerInfoData = response.data;
          console.log("数据长度" + response.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    changeData(...theArgs) {
      let disease = theArgs[0].label; //点击的节点的名字 `?diseaseName=${disease}`
      console.log(theArgs);
      if (theArgs[0].isLeafs == 1) {
        postRequest("/filed/getAllFiled", { diseaseName: disease }).then((res) => {
          console.log(res);
          this.filerInfoData = res.data;
        });
      } else {
        this.filerInfoData = []

      }
    },

    markNode(data) {
      this.nodeData = data;
    },

    cleanInput() {
      this.dialogDiseaseVisible = false;
      this.dialogDiseaseVisible2 = false;
      this.diseaseName = "";
    },

    filterData() {
      if (this.showValue == "2") {
        this.filerInfoData = this.tableInfoData.filter(
          (item) => item.is_standard === 1
        );
      } else if (this.showValue == "1") {
        this.filerInfoData = this.tableInfoData;
      } else if (this.showValue == "3") {
        this.filerInfoData = this.tableInfoData.filter(
          (item) => item.is_standard === 0
        );
      }
    },

    handleCheckAllChange(val) {
      if (val) {
        this.checkedCharacter = this.characterOptList;
        console.log(this.checkedCharacter);
      } else {
        this.checkedCharacter = [];
      }
      this.checkedCharacter_Arr[this.nowListIndex] = this.checkedCharacter
    },

    handleCheckedCharacterChange() {
      console.log("已选择列表:")
      console.log(this.checkedCharacter_Arr);
      let checkedCount = this.checkedCharacter.length;
      this.checkAll = checkedCount === this.characterOptList.length;
      this.checkedCharacter_Arr[this.nowListIndex] = this.checkedCharacter
    },

    cleanCheckBox() {
      this.checkAll = false;
      this.checkedCharacter = [];
    },

    submitUpdate() {
      if (this.tableForm_new.standard == "0") {
        this.tableForm_new.is_standard = 0;
        this.tableForm_new.standard = "否";
      } else {
        this.tableForm_new.is_standard = 1;
        this.tableForm_new.standard = "是";
      }
      if (this.tableForm_new.in_disease == "1") {
        this.tableForm_new.in_disease = "一型糖尿病";
      } else if (this.tableForm_new.in_disease == "2") {
        this.tableForm_new.in_disease = "二型糖尿病";
      } else if (this.tableForm_new.in_disease == "3") {
        this.tableForm_new.in_disease = "xxx肺病";
      } else if (this.tableForm_new.in_disease == "4") {
        this.tableForm_new.in_disease = "xxx肺病";
      }
      if (this.tableForm_new.data_type == "1") {
        this.tableForm_new.data_type = "int";
      } else if (this.tableForm_new.data_type == "2") {
        this.tableForm_new.data_type = "float";
      } else if (this.tableForm_new.data_type == "3") {
        this.tableForm_new.data_type = "double";
      } else if (this.tableForm_new.data_type == "4") {
        this.tableForm_new.data_type = "bool";
      } else if (this.tableForm_new.data_type == "5") {
        this.tableForm_new.data_type = "string";
      }
      this.filerInfoData[this.rowid].characterization =
        this.tableForm_new.characterization;
      this.filerInfoData[this.rowid].in_disease = this.tableForm_new.in_disease;
      this.filerInfoData[this.rowid].category = this.tableForm_new.category;
      this.filerInfoData[this.rowid].standard = this.tableForm_new.standard;
      this.filerInfoData[this.rowid].is_standard =
        this.tableForm_new.is_standard;
      this.filerInfoData[this.rowid].data_type = this.tableForm_new.data_type;
      this.tableFormVisable = false;
      this.filerInfoData = this.filerInfoData.filter(
        (item) => item.is_standard === 1
      );
    },

    chooseCharacter(item) {
      this.exchangeCharacterList(0);
      this.characterVisible = true
      this.characterOptItem = item
    },

    exchangeCharacterList(index) {
      this.nowListIndex = index;
      this.characterOptList = this.characterOptList_Arr[index];
      this.checkedCharacter = this.checkedCharacter_Arr[index];
      let checkedCount = this.checkedCharacter.length;
      this.checkAll = checkedCount === this.characterOptList.length;
    },

    // getTableData() {
    //     /*
    //         slice(参数1，参数2)方法是返回一个新的数组对象
    //         参数1：起始下标数
    //         参数2：结束下标数(不计算在内)
    //     */
    //     this.tableData = this.tableNameList.slice((this.pagenum - 1) * this.pagesize, this.pagenum * this.pagesize)
    //     this.total = this.tableNameList.length
    //     //console.log(this.tableNameList);
    // },
    handleSizeChange(size) {
      this.pagesize = size;
      this.pagenum = 1;
      // this.getTableData()
    },
    handleCurrentChange(num) {
      this.pagenum = num;
      // this.getTableData()
    },
    submitData(tableName) {
      this.tempTableName = tableName;
      getRequest(
        `/tTableManager/getFiledNamesByTableName?table_name=${tableName}`
      ).then((resp) => {
        if (resp?.code == "200") {
          this.isView = true;
          this.tableInfoData = resp.data.field;
          this.tempTbaleType = resp.data.disease;
        } else {
          this.$message.error("无法查看该字段信息");
        }
      });
    },
    goBack() {
      this.isView = false;
      this.tempTableName = "";
      this.tempTbaleType = "";
      this.handleCurrentChange(1);
    },
    editTable(row, id) {
      console.log(row)
      this.tableForm = row;
      this.rowid = id;
      this.tableForm_new = JSON.parse(JSON.stringify(row));
      this.tableFormVisable = true;
    },
    handleClose() {
      this.tableFormVisable = false;
      this.resetForm();
    },
    resetForm() {
      this.$refs["tableFormRef"].resetFields();
    },
    submitEdit() {
      postRequest(
        `/tTableManager/updateFieldValues?table_name=${this.tempTableName}`,
        this.tableForm
      ).then((resp) => {
        if (resp.code == "200") {
          // this.isView = true
          // this.tableInfoData = resp.data
          this.tableFormVisable = false;
          //this.resetForm()
          this.$message.success("更新字段成功");
          getRequest(
            `/tTableManager/getFiledNamesByTableName?table_name=${this.tempTableName}`
          ).then((resp) => {
            if (resp.code == "200") {
              this.isView = true;
              this.tableInfoData = resp.data.field;
            } else {
              this.$message.error("无法查看该字段信息");
            }
          });
        } else {
          this.$message.error("无法查看该字段信息");
        }
      });
    },
    selectChanged(val, ref) {
      let count = 0;
      this.tableInfoData.forEach((element) => {
        count = count + (element["is_label"] - 0);
      });

      //单疾病情况
      if (this.tempTbaleType != "多疾病" && count >= 2) {
        this.$message.error("单疾病只能有一个字段为标签！");
        this.tableForm.is_label = "0";
      } else if (this.tempTbaleType != "多疾病" && count <= 1) {
        if (val == 1) {
          let flag = false;
          let tempLable = ref.$parent.prop;
          for (const item in this.tableForm) {
            if (item !== tempLable && this.tableForm[item] == "1") {
              flag = true;
              this.tableForm[item] = "0";
            }
          }
          if (flag) {
            this.$message.warning("一个字段只能为一种标签!");
          }
        }
      }
      //多疾病
      else if (this.tempTbaleType == "多疾病") {
        if (val == 1) {
          let flag = false;
          let tempLable = ref.$parent.prop;
          for (const item in this.tableForm) {
            if (item !== tempLable && this.tableForm[item] == "1") {
              flag = true;
              this.tableForm[item] = "0";
            }
          }
          if (flag) {
            this.$message.warning("一个字段只能为一种标签!");
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.tableNameList {
  width: 100%;
  margin: 1%;
  display: flex;
  flex-wrap: wrap;
}

.tableName {
  margin: 1%;
}

.submit-data {
  height: 40px;
  width: 70px;
}

.left_tree {
  display: inline-block;
  height: 800px;
  width: 15%;
  border-radius: 3px;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.add_button {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.nameInput {
  width: 70%;
}

.right_table_topCard {
  padding: 0;
  height: auto;
  width: 95%;
  border-radius: 3px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  top: 2%;
  left: 1%;
}

.right_table {
  display: inline-block;
  height: auto;
  width: 75%;
  position: absolute;
}
</style>