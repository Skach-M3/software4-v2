<template>
  <div>
    <!--==========================     头部按钮     ==============================================================-->
    <div id="top_buttons">
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
    </div>

    <!--===============================    表格     ==============================================================-->
    <div id="table">
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
        <el-table-column label="创建时间" prop="create_time"> </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--===============================     导入数据表单   ===================================================================-->
    <el-dialog
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
        <el-form-item label="数据表名称" prop="tableName">
          <el-input
            v-model="dialogForm.tableName"
            placeholder="请输入数据表名称"
            @input="checkDataName"
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
        <!-- <el-form-item label="特征个数" prop="featuresNum">
          <el-input-number
            v-model="dialogForm.featuresNum"
            :min="1"
            :step="1"
            @change="generateFields"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          id="features"
          v-for="(field, index) in dialogForm.fields"
          :key="index"
          :label="'特征' + (index + 1)"
          :prop="'field' + index"
        >
          <el-input
            v-model="field.name"
            :placeholder="'请输入特证' + (index + 1) + '名称'"
          ></el-input>
          <el-select v-model="field.type" placeholder="请选择特征类型">
            <el-option label="人口学特征" value="people"></el-option>
            <el-option label="社会学特征" value="social"></el-option>
            <el-option label="生理学特征" value="medical"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetForm('dialogFormRef')">重置</el-button>
        <el-button type="primary" @click="submitTable">下一步</el-button>
      </div>
      <!--          选择数据表单       -->
      <el-dialog
        width="30%"
        title="选择本地数据表"
        :visible.sync="selectVisible"
        append-to-body
      >
        <el-upload
          action=""
          class="upload"
          ref="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          accept=".csv"
          :limit="1"
          :multiple="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { getRequest } from "@/api/user";
import { mapGetters, mapState } from "vuex";
import { disOptions } from "@/components/tab/constData.js";
import { resetForm, debounce } from "../mixins/mixin";

export default {
  mixins: [resetForm, debounce],
  computed: {
    ...mapGetters(["dataDisList", "dataCreatorList"]),
    ...mapState(["dataList"]),
  },

  data() {
    return {
      disease: "",
      creator: "",
      disOptions,
      dialogForm: {
        tableName: "",
        dataDisease: "",
        featuresNum: 1,
        fields: [{ name: "", type: "" }],
        rules: {
          tableName: [
            { required: true, message: "数据表名称不能为空", trigger: "blur" },
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
      selectVisible: false,
    };
  },

  created() {
    // this.$watch("dialogForm.tableName",()=>{
    //   debounce_func(() => {
    //     console.log("laksdjflkasdjflkasdjf");
    //   }, 1000);
    // })
    this.checkDataName = this.debounce(() => {
      console.log(this.dialogForm.tableName);
      getRequest("/DataTable/inspection", {
        newname: this.dialogForm.tableName,
      }).then((res) => {
        if (!res) {
          this.$message({
            showClose: true,
            message: "数据表重名，请重新填写",
            type: "error",
          });
        }
      });
    }, 1000);
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    clearFilter() {
      this.disease = "";
      this.creator = "";
    },
    importData() {
      this.dialogFormVisible = true;
    },

    generateFields() {
      const numFields = parseInt(this.dialogForm.featuresNum);
      if (!isNaN(numFields)) {
        this.dialogForm.fields = Array.from({ length: numFields }, () => ({
          name: "",
          type: "",
        }));
      }
    },

    handleSubmit() {
      console.log("文件上传中...");
    },
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
    submitTable() {
      this.$refs["dialogFormRef"].validate((valid) => {
        if (valid) {
          this.selectVisible = true;
        } else {
          this.$message("请填写必填项");
          return false;
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
/*#importDataTable >>> .el-input__inner{*/
/*    width: 85%;*/
/*}*/
/*#features >>> .el-input__inner{*/
/*    margin-bottom: 24px;*/
/*}*/
</style>
