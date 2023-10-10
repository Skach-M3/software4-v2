<template lang="">
    <div>
        <span style="margin-left: 2.8%;font-size: 20px;" v-show="!isView">请选择数据表</span>
        <div class="tableNameList">
            <el-card v-show="!isView" v-for="(item, index) in tableData" :key="index" class="tableName">
                <img src="@/assets/dataset.png" class="image" object-fit="contain"
                    style="height: 150px; width: 150px;" />
                <div>
                    <span>{{item}}</span>
                </div>
                <el-button class="submit-data" @click="submitData(item)">确认</el-button>
            </el-card>
        </div>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
                :page-sizes="[1, 5, 10, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" v-show="!isView" :hide-on-single-page="true">
            </el-pagination>
        </div>
        <div v-show="isView">
            <el-page-header @back="goBack">
            </el-page-header>
            <el-table :data="tableInfoData" style="width: 100%; margin-top: 20px" max-height="650px" border stripe>
                <el-table-column type="index"> </el-table-column>
                <el-table-column prop="field_name" label="字段名称" width="170">
                </el-table-column>
                <el-table-column prop="is_demography" label="是否为人口学特征" width="200">
                </el-table-column>
                <el-table-column prop="is_physiological" label="是否为行为学特征" width="200">
                </el-table-column>
                <el-table-column prop="is_sociology" label="是否为社会学特征" width="200">
                </el-table-column>
                <el-table-column prop="is_label" label="是否为标签" width="200">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scoped">
                        <el-button type="primary" icon="el-icon-edit" circle
                            @click="editTable(tempTableName,scoped.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="tableForm.field_name" :visible.sync="tableFormVisable" width="40%"
            :before-close="handleClose">
            <el-form ref="tableFormRef" :model="tableForm" label-width="160px">
                <el-form-item label="是否为人口学特征" prop="is_demography">
                    <el-select ref="is_demography" v-model="tableForm.is_demography" placeholder="请选择"
                        @change="((value)=>{selectChanged(value,  $refs.is_demography)})">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="是否为行为学特征" prop="is_physiological">
                    <el-select ref="is_physiological" v-model="tableForm.is_physiological" placeholder="请选择"
                        @change="((value)=>{selectChanged(value, $refs.is_physiological)})">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="是否为社会学特征" prop="is_sociology">
                    <el-select ref="is_sociology" v-model="tableForm.is_sociology" placeholder="请选择"
                        @change="((value)=>{selectChanged(value,  $refs.is_sociology)})">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否为标签" prop="is_label">
                    <el-select ref="is_label" v-model="tableForm.is_label" placeholder="请选择"
                        @change="((value)=>{selectChanged(value,  $refs.is_label)})">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitEdit">修改</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import { getRequest, postRequest } from "@/utils/api";
    export default {
        data() {
            return {
                tableNameList: [],
                tableData: [],
                isView: false,
                pagenum: 1,
                pagesize: 10,
                total: 0,
                tableInfoData: [],
                tempTableName: '',
                tempTbaleType: "",
                tableForm: {
                    fieldName: '',
                    is_demography: '',
                    is_physiological: '',
                    is_sociology: '',
                    is_label: ''
                },
                tableFormVisable: false,
                options: [{
                    value: '1',
                    label: '是'
                }, {
                    value: '0',
                    label: '否'
                }],

            }
        },
        created() {
            this.getTableNameList();

        },
        methods: {
            getTableNameList() {
                let loginUid = sessionStorage.getItem("userid") - 0
                getRequest(`/tTableManager/getTableNames/${loginUid}`).then((resp) => {
                    if (resp?.code == "200") {
                        this.tableNameList = resp.data
                        this.getTableData();
                        if(!this.tableNameList.length){
                            this.$message.warning("您还没有上传任何数据！")
                        }
                    }
                    else {
                        this.$message.error("获取字段信息失败")
                    }
                });
            },
            getTableData() {
                /*
                    slice(参数1，参数2)方法是返回一个新的数组对象
                    参数1：起始下标数
                    参数2：结束下标数(不计算在内)
                */
                this.tableData = this.tableNameList.slice((this.pagenum - 1) * this.pagesize, this.pagenum * this.pagesize)
                this.total = this.tableNameList.length
                //console.log(this.tableNameList);
            },
            handleSizeChange(size) {
                this.pagesize = size
                this.pagenum = 1
                this.getTableData()
            },
            handleCurrentChange(num) {
                this.pagenum = num
                this.getTableData()
            },
            submitData(tableName) {
                this.tempTableName = tableName;
                getRequest(`/tTableManager/getFiledNamesByTableName?table_name=${tableName}`).then((resp) => {
                    if (resp?.code == "200") {
                        this.isView = true
                        this.tableInfoData = resp.data.field
                        this.tempTbaleType = resp.data.disease
                    }
                    else {
                        this.$message.error("无法查看该字段信息")
                    }
                });
            },
            goBack() {
                this.isView = false;
                this.tempTableName = '';
                this.tempTbaleType = '';
                this.handleCurrentChange(1);
            },
            editTable(tempTableName, row) {
                this.tableForm = row;
                this.tableFormVisable = true;
            },
            handleClose() {
                
                this.tableFormVisable = false
                this.resetForm()
            },
            resetForm() {
                this.$refs['tableFormRef'].resetFields();
            },
            submitEdit() {
                postRequest(`/tTableManager/updateFieldValues?table_name=${this.tempTableName}`, this.tableForm).then((resp) => {
                    if (resp.code == "200") {
                        // this.isView = true
                        // this.tableInfoData = resp.data
                        this.tableFormVisable = false
                        //this.resetForm()
                        this.$message.success("更新字段成功")
                        getRequest(`/tTableManager/getFiledNamesByTableName?table_name=${this.tempTableName}`).then((resp) => {
                    if (resp.code == "200") {
                        this.isView = true
                        this.tableInfoData = resp.data.field
                    }
                    else {
                        this.$message.error("无法查看该字段信息")
                    }
                });
                    }
                    else {
                        this.$message.error("无法查看该字段信息")
                    }
                }
                
                );
                
            },
            selectChanged(val, ref) {
                let count = 0;
                this.tableInfoData.forEach(element => {
                    count = count + (element["is_label"]-0);
                });
                
                //单疾病情况
                if (this.tempTbaleType != "多疾病" && count >= 2) {
                    this.$message.error("单疾病只能有一个字段为标签！")
                    this.tableForm.is_label="0"
                }
                else if(this.tempTbaleType != "多疾病" && count <= 1)
                {
                    if (val == 1) {
                        let flag = false;
                        let tempLable = ref.$parent.prop;
                        for (const item in this.tableForm) {
                            if (item !== tempLable && this.tableForm[item] == "1") {
                                flag = true
                                this.tableForm[item] = "0";
                            }
                        }
                        if (flag) {
                            this.$message.warning("一个字段只能为一种标签!");
                        }
                    }
                }
                //多疾病
                else if(this.tempTbaleType == "多疾病" ){
                    if (val == 1) {
                        let flag = false;
                        let tempLable = ref.$parent.prop;
                        for (const item in this.tableForm) {
                            if (item !== tempLable && this.tableForm[item] == "1") {
                                flag = true
                                this.tableForm[item] = "0";
                            }
                        }
                        if (flag) {
                            this.$message.warning("一个字段只能为一种标签!");
                        }
                    }
                }
            }
        }
    }
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
</style>