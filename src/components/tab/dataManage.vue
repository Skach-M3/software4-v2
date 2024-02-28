<template>
  <div>
    <!--==========================     头部按钮     ==============================================================-->
    <!-- <div id="top_buttons">
      <div id="DiseaseFilter">
        <span>涉及病种：</span>
        <el-select v-model="disease" placeholder="请选择">
          <el-option
            v-for="item in dataDisList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>

      <div id="creatorFilter">
        <span>创建人：</span>
        <el-select v-model="creator" placeholder="请选择">
          <el-option
            v-for="item in dataCreatorList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <el-button @click="clearFilter">清除</el-button>

      <div id="top_right_buttons">
        <el-button type="primary" @click="importData">导入数据表</el-button>
      </div>
    </div> -->

    <!--===============================    表格     ==============================================================-->
    <!-- <div id="table">
      <el-table
        :data="
          dataList.filter(
            (data) =>
              !(disease || creator) ||
              (data.disease.includes(disease) && data.creator.includes(creator))
          )
        "
        style="width: 100%"
        stripe
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column label="数据表" prop="table_name"> </el-table-column>
        <el-table-column label="涉及病种" prop="disease"> </el-table-column>
        <el-table-column label="样本个数" prop="samplesize"> </el-table-column>
        <el-table-column label="字段个数" prop="featurenumber">
        </el-table-column>
        <el-table-column label="创建人" prop="creator"> </el-table-column>
        <el-table-column label="UID" prop="uid"> </el-table-column>
        <el-table-column label="创建时间" prop="create_time"> </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-button slot="reference" size="mini" type="primary"  style="margin-right: 10px" @click="getData(scope.row.table_name)"
                >查看</el-button
              >
            <el-popconfirm
              title="删除后无法恢复"
              icon="el-icon-warning"
              icon-color="red"
              @confirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger" :disabled="scope.row.uid != loginUserID"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
      <!-- ==============================     查看数据的对话框 ================================================================ -->
    
<!-- <el-dialog
  title="详细数据"
  :visible.sync="DatadialogVisible"
  v-if="DatadialogVisible"
  width="70%">
  <el-table
      :data="patientTable"
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
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="DatadialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->
    <!--===============================     导入数据表单   ===================================================================-->
    <!-- <el-dialog
      v-loading="loading"
      :element-loading-text="loadText"
      id="importDataTable"
      title="导入数据表"
      :visible.sync="dialogFormVisible"
      width="40%"
    >
      <el-form
        :model="dialogForm"
        ref="dialogFormRef"
        :rules="dialogForm.rules"
        label-width="110px"
      >
        <el-form-item label="选择数据表" prop="filesInfo">
          <el-upload
            action=""
            class="upload"
            ref="uploadRef"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="changeFile"
            :auto-upload="false"
            accept=".csv"
            :limit="1"
            :multiple="false"
            :file-list="dialogForm.filesInfo"
            :http-request="
              (data) => {
                upRequest(data);
              }
            "
          >
            <el-button slot="trigger" size="small" type="success"
              >选取文件</el-button
            >
            <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="数据表名称" prop="tableName">
          <el-input
            v-model="dialogForm.tableName"
            placeholder="请输入数据表名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="涉及疾病" prop="dataDisease">
          <el-select
            v-model="dialogForm.dataDisease"
            filterable
            placeholder="请选择或搜索"
          >
            <el-option
              v-for="item in disOptions"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible = false;
            resetForm('dialogFormRef');
          "
          >取消</el-button
        >
        <el-button @click="resetForm('dialogFormRef')">重置</el-button>
        <el-button type="primary" @click="uploadFile">下一步</el-button>
      </div>

      <el-dialog
        v-loading="loading2"
        :element-loading-text="loadText2"
        append-to-body
        title="请选择特征类型"
        :visible.sync="featuresVision"
      >
        <el-form class="featureLabel" label-width="auto">
          <el-form-item
            v-for="(name, index) in Object.keys(featuresMap)"
            :key="index"
            :label="name"
          >
            <el-select
              v-model="featuresMap[name]"
              placeholder="请选择特征类型"
              @change="changeLabel(name, featuresMap[name])"
            >
              <el-option
                label="人口学特征"
                value="people"
                key="people"
              ></el-option>
              <el-option
                label="社会学特征"
                value="social"
                key="social"
              ></el-option>
              <el-option
                label="生理学特征"
                value="medical"
                key="medical"
              ></el-option>
              <el-option label="标签特征" value="label" key="label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="compelete">完成上传</el-button>
        </div>
      </el-dialog>
    </el-dialog> -->
    <div class="left_tree">
      <el-button type="success" class="add_button" @click="dialogDiseaseVisible2 = true">添加病种</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogDiseaseVisible2"
        width="30%">
        <span>
          请输入新病种名称：<el-input placeholder="请输入内容" v-model="diseaseName" class="nameInput"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cleanInput()">取 消</el-button>
          <el-button type="primary" @click="addDisease()">确 定</el-button>
        </span>
      </el-dialog>
      <el-tree
        ref="tree"
        :data="treeData"
        :show-checkbox="false"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :check-on-click-node="true"
        :highlight-current="true"
        @node-click="changeData"
        @check="changeData"
        @check-change="handleCheckChange">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <!--公共数据集confirm-->
            <el-popconfirm
              v-if="data.isCommon"
              confirm-button-text='新病种'
              cancel-button-text='数据集'
              title="请选择添加的文件"
              cancel-button-type="primary"
              @confirm="dialogDiseaseVisible=true"
              @cancel="dialogFormVisible=true">
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
            <!--非公共数据集confirm-->
            <el-popconfirm
                  v-else
                  confirm-button-text='新病种'
                  cancel-button-text='数据集'
                  title="请选择添加的文件"
                  cancel-button-type="primary"
                  @confirm="dialogDiseaseVisible=true"
                  @cancel="openAddDataForm(data.path)">
              <el-button
                      v-if="!data.isLeafs"
                      icon="el-icon-folder-add"
                      size="mini"
                      type="text"
                      slot="reference"
                      @click="markNode(data)">
              </el-button>
            </el-popconfirm>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="() => remove(node, data)">
            </el-button>
          </span>
        </span>
      </el-tree>
        <el-dialog
          title="提示"
          :visible.sync="dialogDiseaseVisible"
          width="30%">
          <span>
            请输入新病种名称：<el-input placeholder="请输入内容" v-model="diseaseName" class="nameInput"></el-input>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cleanInput()">取 消</el-button>
            <el-button type="primary" @click="() => append()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-dialog
              title="新增数据集"
              :visible.sync="dialogDataVisible"
              width="60%">
          <div class="addDataClass">
              <i style="margin-left: 10px" class="el-icon-s-data"></i>&nbsp;&nbsp;&nbsp;数据集：<el-input v-model="addDataForm.dataName" placeholder="请输入数据集名称"></el-input>
              <span class="addDataBaseInfo">
                                      <i class="el-icon-user-solid"></i>&nbsp;&nbsp;&nbsp;创建人：<span>{{ showDataForm.LoginUserName }}</span>
                                  </span>
              <span class="addDataBaseInfo">
                                      <i class="el-icon-time"></i>&nbsp;&nbsp;&nbsp;创建时间：<span>{{ showDataForm.date }}</span>
                                  </span>
              <span class="addDataBaseInfo">
                                      <i class="el-icon-pie-chart"></i>&nbsp;&nbsp;&nbsp;所属类别：<span>{{ showDataForm.type }}</span>
                                  </span>
          </div>
          <div class="addDataClass" style="margin-top: 20px">
              <div class="addDataTitle"><i class="el-icon-connection"></i>&nbsp;&nbsp;特征选择</div>
              <div style="margin-top: 20px;">
                  <el-button type="primary" plain icon="el-icon-plus" style="margin-right: 8px" @click="putToAddDataForm">添加新条件</el-button>
                  <el-button @click="chooseCharacter(addDataForm.characterList[0])" style="width: 130px;margin-right: 8px;margin-left: 0px">{{ addDataForm.characterList[0].button }}</el-button>
                  <span v-if="addDataForm.characterList[0].type==='discrete'">
                                                  <el-select :value="'='" slot="prepend" placeholder="运算符" style="width: 90px;margin-right: 8px" disabled>
                                                     <el-option label="=" value="="></el-option>
                                                  </el-select>
                                                  <el-select  v-model="addDataForm.characterList[0].value" placeholder="请选择特征取值" style="width: 300px">
                                                    <el-option
                                                            v-for="item in addDataForm.characterList[0].range"
                                                            :key="item"
                                                            :label="item"
                                                            :value="item">
                                                    </el-option>
                                                  </el-select>
                                              </span>
                  <span v-else>
                                                  <el-select v-model="addDataForm.characterList[0].computeOpt" slot="prepend" placeholder="运算符" style="width: 90px;margin-right: 8px">
                                                     <el-option label=">" value=">"></el-option>
                                                     <el-option label="<" value="<"></el-option>
                                                     <el-option label="=" value="="></el-option>
                                                  </el-select>
                                                  <el-input  v-model="addDataForm.characterList[0].value" placeholder="请输入特征取值" style="width: 300px" ></el-input>
                                                  <el-button disabled style="width: 115px;background-color:#f5f7fa;">单位：{{ addDataForm.characterList[0].unit }}</el-button>
                                              </span>
              </div>
              <div style="margin-top: 20px;" v-for="(characterItem,index) in addDataForm.characterList.slice(1)" :key="index">
                  <el-select v-model="characterItem.opt" slot="prepend" placeholder="条件选择" style="width: 130px;margin-right: 8px">
                      <el-option label="AND" value="0"></el-option>
                      <el-option label="OR" value="1"></el-option>
                      <el-option label="NOT" value="2"></el-option>
                  </el-select>
                  <el-button @click="chooseCharacter(characterItem)" style="width: 130px;margin-right: 8px;">{{ characterItem.button }}</el-button>
                  <span v-if="characterItem.type==='discrete'">
                                                  <el-select :value="'='" slot="prepend" placeholder="运算符" style="width: 90px;margin-right: 8px" disabled>
                                                     <el-option label="=" value="="></el-option>
                                                  </el-select>
                                                  <el-select  v-model="characterItem.value" placeholder="请选择特征取值" style="width: 300px">
                                                    <el-option
                                                            v-for="item in characterItem.range"
                                                            :key="item"
                                                            :label="item"
                                                            :value="item">
                                                    </el-option>
                                                  </el-select>
                                              </span>
                  <span v-else>
                                                  <el-select v-model="characterItem.computeOpt" slot="prepend" placeholder="运算符" style="width: 90px;margin-right: 8px">
                                                     <el-option label=">" value=">"></el-option>
                                                     <el-option label="<" value="<"></el-option>
                                                     <el-option label="=" value="="></el-option>
                                                  </el-select>
                                                  <el-input  v-model="characterItem.value" placeholder="请输入特征取值" style="width: 300px" ></el-input>
                                                  <el-button disabled style="width: 115px;background-color:#f5f7fa;">单位：{{ characterItem.unit }}</el-button>
                                              </span>
                  <el-button type="primary" plain icon="el-icon-delete" style="margin-left: 10px" @click="deleteToAddDataForm(characterItem)">删除</el-button>
              </div>
              <div style="margin-top: 20px;margin-bottom:10px;display: flex;justify-content: center">
                  <button class="cool-button" @click="submitCharacterCondition">筛选病例</button>
              </div>


              <el-table :data="addTableData" stripe style="width: 100%" height="450" v-show="showAddTableData">
                  <el-table-column prop="date" label="特征1" width="80">
                  </el-table-column>
                  <el-table-column prop="sex" label="特征2" width="80">
                  </el-table-column>
                  <el-table-column prop="age" label="特征3" width="80">
                  </el-table-column>
                  <el-table-column prop="date" label="特征4" width="80">
                  </el-table-column>
                  <el-table-column prop="sex" label="特征5" width="80">
                  </el-table-column>
                  <el-table-column prop="age" label="特征6" width="80">
                  </el-table-column>
                  <el-table-column prop="sex" label="特征7" width="80">
                  </el-table-column>
                  <el-table-column prop="age" label="特征8" width="80">
                  </el-table-column>
                  <el-table-column prop="date" label="特征9" width="80">
                  </el-table-column>
                  <el-table-column prop="sex" label="特征10" width="80">
                  </el-table-column>
                  <el-table-column prop="date" label="特征17" width="80">
                  </el-table-column>
                  <el-table-column prop="date" label="特征18" width="80">
                  </el-table-column>
                  <el-table-column prop="date" label="特征19" width="80">
                  </el-table-column>
              </el-table>

          </div>


          <span slot="footer" class="dialog-footer">
                            <el-button @click="cleanDataInput()">取 消</el-button>
                            <el-button type="primary" @click="addTable()">新建表</el-button>
                          </span>
          <el-dialog
                  title="特征选择"
                  :visible.sync="characterVisible"
                  width="50%"
                  append-to-body>
              <el-container>
                  <el-aside width="180px">
                      <el-menu
                              default-active="1"
                              class="el-menu-vertical-demo">
                          <el-menu-item index="1" @click="exchangeCharacterList(0)">
                              <span slot="title">诊断</span>
                          </el-menu-item>
                          <el-menu-item index="2" @click="exchangeCharacterList(1)">
                              <span slot="title">检查</span>
                          </el-menu-item>
                          <el-menu-item index="3">
                              <span slot="title">病理</span>
                          </el-menu-item>
                          <el-menu-item index="4">
                              <span slot="title">生命体征</span>
                          </el-menu-item>
                          <el-menu-item index="5">
                              <span slot="title">诊断</span>
                          </el-menu-item>
                          <el-menu-item index="6">
                              <span slot="title">检查</span>
                          </el-menu-item>
                          <el-menu-item index="7">
                              <span slot="title">病理</span>
                          </el-menu-item>
                          <el-menu-item index="8">
                              <span slot="title">生命体征</span>
                          </el-menu-item>
                      </el-menu>
                  </el-aside>
                  <el-main>
                      <el-radio-group v-model="characterId">
                          <el-radio v-for="optItem in characterOptList" :label="optItem.characterId" border style="margin-bottom: 10px">{{ optItem.chName }}</el-radio>
                      </el-radio-group>
                  </el-main>
              </el-container>
              <span slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="confirmCharacter()">确 定</el-button>
                                </span>
          </el-dialog>
      </el-dialog>
      <!--===============================     导入数据表单   ===================================================================-->
      <el-dialog
              v-loading="loading"
              :element-loading-text="loadText"
              id="importDataTable"
              title="导入数据表"
              :visible.sync="dialogFormVisible"
              width="40%"
      >
          <el-form
                  :model="dialogForm"
                  ref="dialogFormRef"
                  :rules="dialogForm.rules"
                  label-width="110px"
          >
              <el-form-item label="选择数据表" prop="filesInfo">
                  <el-upload
                          action=""
                          class="upload"
                          ref="uploadRef"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :on-change="changeFile"
                          :auto-upload="false"
                          accept=".csv"
                          :limit="1"
                          :multiple="false"
                          :file-list="dialogForm.filesInfo"
                          :http-request="
                        (data) => {
                          upRequest(data);
                        }
                      "
                  >
                      <el-button slot="trigger" size="small" type="success"
                      >选取文件</el-button
                      >
                      <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
                  </el-upload>
              </el-form-item>

              <el-form-item label="数据表名称" prop="tableName">
                  <el-input
                          v-model="dialogForm.tableName"
                          placeholder="请输入数据表名称"
                  ></el-input>
              </el-form-item>
              <el-form-item label="涉及疾病" prop="dataDisease">
                  <el-select
                          v-model="dialogForm.dataDisease"
                          filterable
                          placeholder="请选择或搜索"
                  >
                      <el-option
                              v-for="item in disOptions"
                              :key="item.name"
                              :label="item.name"
                              :value="item.name"
                      >
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button
                      @click="
                      dialogFormVisible = false;
                      resetForm('dialogFormRef');
                    "
              >取消</el-button
              >
              <el-button @click="resetForm('dialogFormRef')">重置</el-button>
              <el-button type="primary" @click="uploadFile">下一步</el-button>
          </div>

          <el-dialog
                  v-loading="loading2"
                  :element-loading-text="loadText2"
                  append-to-body
                  title="请选择特征类型"
                  :visible.sync="featuresVision"
          >
              <el-form class="featureLabel" label-width="auto">
                  <el-form-item
                          v-for="(name, index) in Object.keys(featuresMap)"
                          :key="index"
                          :label="name"
                  >
                      <el-select
                              v-model="featuresMap[name]"
                              placeholder="请选择特征类型"
                              @change="changeLabel(name, featuresMap[name])"
                      >
                          <el-option
                                  label="人口学特征"
                                  value="people"
                                  key="people"
                          ></el-option>
                          <el-option
                                  label="社会学特征"
                                  value="social"
                                  key="social"
                          ></el-option>
                          <el-option
                                  label="生理学特征"
                                  value="medical"
                                  key="medical"
                          ></el-option>
                          <el-option label="标签特征" value="label" key="label"></el-option>
                      </el-select>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="compelete">完成上传</el-button>
              </div>
          </el-dialog>
      </el-dialog>
    <div class="right_table">
        <el-card class="right_table_topCard">
          <div class="describe_content">
            <h3>数据集名称</h3>
            <p style="margin-top:0.5%">
              <i class="el-icon-user"></i>创建人: <span>张三</span>
              <i class="el-icon-time"></i>创建时间: <span>2023.12.13</span>
              <i class="el-icon-folder-opened"></i>所属类别: <span>糖尿病/一型糖尿病</span>
            </p>
          </div>
          <el-table :data="tableData" stripe style="width: 100%" class="custom-table">
            <el-table-column prop="date" label="特征1" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征2" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征3" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征4" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征5" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征6" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征7" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征8" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征9" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征10" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征11" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征12" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征13" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征14" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征15" width="80">
            </el-table-column>
            <el-table-column prop="date" label="特征16" width="80">
            </el-table-column>

          </el-table>
        </el-card>
      </div>
  </div>
</template>

<script>
import { getRequest, postRequest } from "@/api/user";
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import { disOptions } from "@/components/tab/constData.js";
import { resetForm, debounce } from "../mixins/mixin";
import { treeData } from "@/components/tab/treeData.js";
import { tableData, tableData2 } from "@/components/tab/TableData.js";
import { addTableData } from "@/components/tab/addTableData.js";

let id = 1000;

export default {
  mixins: [resetForm, debounce],
  computed: {
    ...mapGetters(["dataDisList", "dataCreatorList"]),
    ...mapState(["dataList"]),
    loginUserID(){
      return sessionStorage.getItem("userid")
    }
  },

  watch: {
    "dialogForm.tableName"() {
      this.checkTableName();
    },
  },

  data() {
    return {
      // 获取虚拟树形结构数据
      treeData: JSON.parse(JSON.stringify(treeData)),
      // 获取虚拟表格数据
      tableData: JSON.parse(JSON.stringify(tableData)),

      dialogDiseaseVisible: false,
      dialogDataVisible: false,
      characterVisible: false,
      showAddTableData: false,
      characterId:1,
      showDataForm: {
          LoginUserName:'',
          date:'',
          type:''
      },
      addDataForm:{
          dataName:"",
          characterList:[
              {
                  opt:'',
                  characterId:-1,
                  featureName: '',
                  chName: '',
                  type: '',
                  unit:'',
                  range:'',
                  button:'点击选择特征',
                  value:'',
                  computeOpt:''
              }
          ]
      },
      characterOptList:[
          {
              characterId:1,
              featureName: 'sex',
              chName: '性别',
              type: 'discrete',//离散类型
              range: ["male","female"],
              unit: '',
          },
          {
              characterId:2,
              featureName: 'hypoglycemia',
              chName: '血糖',
              type: 'continuous',//连续类型
              range: '50-100',
              unit: 'mg/dl',
          },
          {
              characterId:3,
              featureName: 'sex',
              chName: '性别1',
              type: 'discrete',//离散类型
              range: ["male","female"],
              unit: '',
          },
          {
              characterId:4,
              featureName: 'sex',
              chName: '性别2',
              type: 'discrete',//离散类型
              range: ["male","female"],
              unit: '',
          },
          {
              characterId:5,
              featureName: 'sex',
              chName: '性别3',
              type: 'discrete',//离散类型
              range: ["male","female"],
              unit: '',
          },
          {
              characterId:6,
              featureName: 'sex',
              chName: '性别4',
              type: 'discrete',//离散类型
              range: ["male","female"],
              unit: '',
          },
          {
              characterId:7,
              featureName: 'sex',
              chName: '性别5',
              type: 'discrete',//离散类型
              range: ["male","female"],
              unit: '',
          },
          {
              characterId:8,
              featureName: 'sex',
              chName: '性别6',
              type: 'discrete',//离散类型
              range: ["male","female"],
              unit: '',
          }
      ],
      addTableData: addTableData,
      input3: '',
      select: '',

      dialogDiseaseVisible2: false,

      nodeData: {},

      diseaseName:'',

      loading: false,
      loading2: false,
      getData_loading: false,
      loadText: "拼命加载中",
      loadText2: "拼命加载中",
      disease: "",
      creator: "",
      disOptions,
      featuresVision: false,
      DatadialogVisible:false,
      featuresMap: {},
      patientTable:[],
      dialogForm: {
        filesInfo: [],
        tableName: "",
        isOnly: true,
        dataDisease: "",
        featuresNum: 1,
        fields: [{ name: "", type: "" }],
        rules: {
          tableName: [
            {
              required: true,
              message: "数据表名称不能为空",
              trigger: "change",
            },
          ],
          dataDisease: [
            {
              required: true,
              message: "涉及疾病不能为空",
              trigger: "blur",
            },
          ],
          numFeatures: [
            { required: true, message: "特征个数不能为空", trigger: "blur" },
            { type: "integer", message: "特征个数需为整数", trigger: "blur" },
            { min: 1, message: "特征个数需>1", trigger: "blur" },
          ],
        },
      },
      dialogFormVisible: false,
      options: {
        method: "post",
        data: {},
        url: "/DataTable/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    };
  },

  created() {
    // 检查重名的防抖函数
    this.checkTableName = this.debounce(() => {
      getRequest("/DataTable/inspection", {
        newname: this.dialogForm.tableName,
      }).then((res) => {
        // 上一次重复了这一次不重复就要提醒一下
        if (!this.dialogForm.isOnly && res) {
          this.$message({
            showClose: true,
            message: "表名可用",
            type: "success",
          });
        }
        if (typeof res === "boolean") {
          this.dialogForm.isOnly = res;
        }
        if (!res) {
          this.$message({
            showClose: true,
            message: "数据表重名，请重新填写",
            type: "warning",
          });
          return false;
        }
        return true;
      });
    }, 200);
  },

  methods: {
    append() {
        let isCommon = false
        if (this.nodeData.isCommon)isCommon=true
        else isCommon=false
        const newChild = { id: id++, label: this.diseaseName, children: [] , isLeafs: true,isCommon:isCommon};
        console.log(this.nodeData)
        if (!this.nodeData.children) {
            this.$set(this.nodeData, 'children', []);
        }
        this.nodeData.children.push(newChild);
        this.nodeData = {};
        this.cleanInput();
        this.dialogDiseaseVisible = false;
    },
      appendCommon() {
          const newChild = { id: id++, label: this.diseaseName, children: [] , isLeafs: false,isCommon:true};
          if (!this.nodeData.children) {
              this.$set(this.nodeData, 'children', []);
          }
          this.nodeData.children.push(newChild);
          this.nodeData = {};
          this.cleanInput();
      },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    addDisease() {
      const newNode = { id: id++, label: this.diseaseName, children: [] , isLeafs: false};
      this.treeData.push(newNode);
      this.cleanInput()
    },

    handleCheckChange(data, checked) {
      if (checked) {
        this.$refs.tree.setCheckedKeys([data.id])
      }
    },

    changeData(data){
      if (data.isLeafs && data.label == '数据集1') {
        this.dataTableShow = true
        this.tableData = JSON.parse(JSON.stringify(tableData))
      } else if (data.isLeafs && data.label != '数据集1') {
        this.tableData = JSON.parse(JSON.stringify(tableData2))
        this.dataTableShow = true 
      } else {
        this.dataTableShow = false
      }
    },

    markNode(data){
      this.nodeData = data;
    },

    cleanInput(){
      this.dialogDiseaseVisible = false;
      this.dialogDiseaseVisible2 = false;
      this.diseaseName = ""
    },
    cleanDataInput(){
      this.dialogDataVisible = false
    },
    addTable(){
      this.diseaseName = this.addDataForm.dataName
      this.dialogDataVisible = false
      this.append()
    },
    putToAddDataForm(){
        let number = -Math.floor(Math.random() * 100);
        let item = {
            opt:'',
            characterId:-1,
            featureName: '',
            chName: '',
            type: '',
            unit:'',
            range:'',
            removeIndex:number,
            button:'点击选择特征',
            value:'',
            computeOpt:''
        }
        this.addDataForm.characterList.push(item);
    },
    deleteToAddDataForm(item){
        let index = this.addDataForm.characterList.indexOf(item)
        if (index !== -1) {
            this.addDataForm.characterList.splice(index, 1)
        }
    },
    chooseCharacter(item){
        this.characterVisible = true
        this.characterOptItem = item
    },
    submitCharacterCondition() {
        //展示表格
        this.showAddTableData = true
        //发送axios请求
        let s = JSON.stringify(this.addDataForm.characterList, null, 2);
        console.log(s)
    },
    getNowDateFormat() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    openAddDataForm(type) {
        this.addDataForm = {
            dataName:"",
            characterList:[
                {
                    opt:'',
                    characterId:-1,
                    featureName: '',
                    chName: '',
                    type: '',
                    unit:'',
                    range:'',
                    button:'点击选择特征',
                    value:'',
                    computeOpt:''
                }
            ]
        }
        this.dialogDataVisible=true
        this.showAddTableData=false
        this.showDataForm.LoginUserName = sessionStorage.getItem('username')
        this.showDataForm.date = this.getNowDateFormat()
        this.showDataForm.type = type

    },
    exchangeCharacterList(index){
        if (index===0){
            this.characterOptList = [
                {
                    characterId:1,
                    featureName: 'sex',
                    chName: '性别',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:2,
                    featureName: 'hypoglycemia',
                    chName: '血糖',
                    type: 'continuous',//连续类型
                    range: '50-100',
                    unit: 'mg/dl',
                },
                {
                    characterId:3,
                    featureName: 'sex',
                    chName: '性别1',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:4,
                    featureName: 'sex',
                    chName: '性别2',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:5,
                    featureName: 'sex',
                    chName: '性别3',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:6,
                    featureName: 'sex',
                    chName: '性别4',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:7,
                    featureName: 'sex',
                    chName: '性别5',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:8,
                    featureName: 'sex',
                    chName: '性别6',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                }
            ]
        }else {
            this.characterOptList = [
                {
                    characterId:1,
                    featureName: 'sex',
                    chName: '护理记录',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:2,
                    featureName: 'hypoglycemia',
                    chName: '分子病理',
                    type: 'continuous',//连续类型
                    range: '50-100',
                    unit: 'mg/dl',
                },
                {
                    characterId:3,
                    featureName: 'sex',
                    chName: '性别1',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:4,
                    featureName: 'sex',
                    chName: '性别2',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:5,
                    featureName: 'sex',
                    chName: '性别3',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:6,
                    featureName: 'sex',
                    chName: '病理4',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:7,
                    featureName: 'sex',
                    chName: '病理5',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                },
                {
                    characterId:8,
                    featureName: 'sex',
                    chName: '病理6',
                    type: 'discrete',//离散类型
                    range: ["male","female"],
                    unit: '',
                }
            ]
        }
    },
    confirmCharacter(){
        this.characterVisible = false
        let index = this.addDataForm.characterList.indexOf(this.characterOptItem)
        let oldObj = this.addDataForm.characterList[index]
        for (let i = 0; i < this.characterOptList.length; i++) {
            let a = this.characterOptList[i]
            if (this.characterId == a.characterId){
                oldObj.characterId = a.characterId
                oldObj.featureName = a.featureName
                oldObj.chName = a.chName
                oldObj.type = a.type
                oldObj.unit = a.unit
                oldObj.range = a.range
                oldObj.button = a.chName
                oldObj.value = ''
            }
        }
        this.addDataForm.characterList[index] = oldObj
        this.characterId=''
    },
    ...mapMutations(["SetDataList"]),
    ...mapActions(["getDataList"]),
    getData(tablename) {
      this.DatadialogVisible = true;
      this.getData_loading = true;
      getRequest("/DataTable/getInfoByTableName", {
        tableName: tablename,
      }).then((res) => {
        this.patientTable = res.data;
        console.log("patientTable:"+res.data);
        this.getData_loading = false;
      });
    },
    changeLabel(name, label) {
      this.featuresMap[name] = label;
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(row) {
      postRequest(`DataTable/delete/${row.id}`).then((res) => {
        this.SetDataList(res.reverse());
      });
    },
    clearFilter() {
      this.disease = "";
      this.creator = "";
    },
    importData() {
      this.dialogFormVisible = true;
    },

    handleSubmit() {
      console.log("文件上传中...");
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      //上传前的验证
      const isCSV =
        file.type === "text/csv" || file.type === "application/vnd.ms-excel";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isCSV) {
        this.$message.error("上传文件仅支持 CSV 格式");
      }
      // if (!isLt2M) {
      //     this.$message.error('上传文件大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
      return isCSV;
    },

    removeFileExtension(fileName) {
      // 寻找最后一个点号的位置
      const lastDotIndex = fileName.lastIndexOf(".");

      // 如果找到了点号并且不在文件名的开头或结尾
      if (
        lastDotIndex !== -1 &&
        lastDotIndex < fileName.length - 1 &&
        lastDotIndex > 0
      ) {
        // 返回删除了后缀的文件名部分
        return fileName.substring(0, lastDotIndex);
      } else {
        // 如果没有找到点号或者点号在文件名的开头或结尾，直接返回原文件名
        return fileName;
      }
    },

    changeFile() {
      console.log(this.$refs["uploadRef"].uploadFiles);
      if (this.dialogForm.tableName.length < 1) {
        this.dialogForm.tableName = this.removeFileExtension(
          this.$refs["uploadRef"].uploadFiles[0].name
        );
      }
    },

    // 数据表上传函数
    upRequest(data) {
      const payload = new FormData();
      payload.append("file", data.file);
      payload.append("newName", this.dialogForm.tableName);
      payload.append("disease", this.dialogForm.dataDisease);
      payload.append("user", sessionStorage.getItem("username"));
      payload.append("uid", sessionStorage.getItem("userid")-0);
      this.options = {
        method: "post",
        data: payload,
        url: "/DataTable/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$axios(this.options).then((res) => {
        this.loading = false;
        console.log(res);
        if (res?.code == "200") {
          this.$message({
            showClose: true,
            type: "success",
            message: "解析成功",
          });
          console.log(payload);
          let featureList = res.tableHeaders;
          // 把特征存为map的键
          for (const item of featureList) {
            this.$set(this.featuresMap, item, "people");
          }
          this.featuresVision = true;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "解析失败",
          });
        }
      });
    },

    uploadFile() {
      if (this.$refs["uploadRef"].uploadFiles.length < 1) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请选择数据表",
        });
        return false;
      }
      this.checkTableName();
      if (!this.dialogForm.isOnly) {
        return false;
      }
      this.$refs["dialogFormRef"].validate((valid) => {
        if (valid) {
          this.loadText = "正在上传并解析文件";
          this.loading = true;
          this.$refs.uploadRef.submit();
        }
      });
    },

    compelete() {
      // 判断多标签合理性
      let labelCount = 0;
      for (const key in this.featuresMap) {
        if (Object.hasOwnProperty.call(this.featuresMap, key)) {
          if (this.featuresMap[key] == "label") {
            labelCount++;
          }
        }
      }
      if (labelCount < 1) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请至少设置一个标签特征",
        });
        return false;
      }
      if (this.dialogForm.dataDisease != "多疾病" && labelCount > 1) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "只有多病种数据集能设置多个标签特征",
        });
        return false;
      }

      this.loadText2 = "正在添加字段类型";
      this.loading2 = true;
      let tableHeaders = [];
      for (const key in this.featuresMap) {
        if (Object.hasOwnProperty.call(this.featuresMap, key)) {
          switch (this.featuresMap[key]) {
            case "people":
              tableHeaders.push({
                fieldName: key,
                isDemography: "1",
              });
              break;
            case "medical":
              tableHeaders.push({
                fieldName: key,
                // isDemography: "0",
                isPhysiological: "1",
                // isSociology: "0",
              });
              break;
            case "social":
              tableHeaders.push({
                fieldName: key,
                // isDemography: "0",
                // isPhysiological: "0",
                isSociology: "1",
              });
              break;
            case "label":
              tableHeaders.push({
                fieldName: key,
                isLabel: "1",
              });
              break;
            default:
              break;
          }
        }
      }
      let userId = sessionStorage.getItem("userid")-0;
      // 上传特征分类结果
      postRequest("/tTableManager/insertTableManager", {
        tableName: this.dialogForm.tableName,
        tableHeaders,
        userId
      }).then((res) => {
        console.log(res);
        // this.$message({
        //   showClose: true,
        //   type: "success",
        //   message: "操作成功，已添加数据表",
        // });
      });

      // 重新上传数据表，使其保存到数据列表中
      // 此处上传时后台已有数据表，可和后台配合只发送保存通知已提高效率
      this.options.url = "/DataTable/uploadTable";
      this.$axios(this.options).then((res) => {

        this.loading2 = false;
        this.resetForm('dialogFormRef');
        if (res?.code == "200") {
          this.$message({
            showClose: true,
            type: "success",
            message: "上传成功",
          });
          this.featuresVision = false;
          this.dialogFormVisible = false;
          this.getDataList();
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "上传失败",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
#top_buttons > * {
  display: inline-block;
}
#DiseaseFilter {
  margin-right: 40px;
}
#creatorFilter {
  margin-right: 20px;
}
#top_right_buttons {
  float: right;
  margin-right: 100px;
}
#table {
  margin-top: 10px;
}

.featureLabel {
  height: 55vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow: auto;
}

.featureLabel .el-form-item__label {
  color: #252525;
}


.left_tree{
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

.right_table {
  display: inline-block;
  height: auto;
  width: 75%;
  position: absolute;
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

.describe_content {
  display: inline-block;
  width: 70%;
}

.describe_content span {
  margin: 10px;
}

.add_button {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.nameInput {
  width: 70%;
}

.addDataClass {
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-size: 16px;
}
.addDataClass .el-input {
  width: 160px;
}
.addDataClass .addDataBaseInfo {
  margin-left: 50px;
}
.addDataClass .addDataTitle{
  margin-top: 10px;
  margin-right: 15px;
  padding-bottom: 10px;
  font-size: 18px;
  border-bottom: 1px solid #ebeef5;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.cool-button {
    display: inline-block;
    padding: 12px 24px;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(to right, #26acdf, #3ee09a);
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    width: 200px;
    letter-spacing: 1px;
    cursor: pointer
}

.cool-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: -1;
}

.cool-button:hover {
    background: linear-gradient(to right, #51bae2, #80e7bb);
}

.cool-button:hover::before {
    transform: scaleX(1);
}
.custom-table tr {
    background-color: #dcf3fc !important;
}
</style>
