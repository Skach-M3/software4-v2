<template lang="">
    <div>
        <div class="left_tree">
            <el-button type="success" class="add_button" @click="dialogDiseaseVisible = true">添加病种</el-button>
            <el-dialog
                title="提示"
                :visible.sync="dialogDiseaseVisible"
                width="30%"
                @close="cleanInput()">
                <span>
                请输入新病种名称：<el-input placeholder="请输入内容" v-model="diseaseName" class="nameInput"></el-input>
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
                @close="cleanInput()">
                <span>
                请输入新病种名称：<el-input placeholder="请输入内容" v-model="diseaseName" class="nameInput"></el-input>
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
                :expand-on-click-node="false"
                :check-on-click-node="true"
                @node-click="changeData"
                @check="changeData"
                @check-change="handleCheckChange">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-popconfirm
                        confirm-button-text='新病种'
                        cancel-button-text='特征表'
                        title="请选择添加的文件"
                        cancel-button-type="primary"
                        @confirm="dialogDiseaseVisible2=true"
                        @cancel="addCharacteration()">
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
                            @click="() => remove(node, data)">
                        </el-button>
                    </span>
                </span>
            </el-tree>
            <el-dialog
            title="特征选择"
            :visible.sync="characterVisible"
            width="50%"
            append-to-body
            @close="cleanCheckBox()">
                <span style="margin-left:20px">
                请输入新病种名称：<el-input placeholder="请输入内容" v-model="diseaseName" class="nameInput"></el-input>
                </span>
                <el-container style="margin-top:10px">
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
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedCharacter" @change="handleCheckedCharacterChange">
                            <el-checkbox v-for="item in characterOptList" :label="item" :key="item.characterId" style="margin-top:10px">{{item.chName}}</el-checkbox>
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
                <el-select v-model="showValue" style="left: 1%" @change="filterData">
                    <el-option
                    v-for="item in diseaseNormalOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </template>
            <el-card class="right_table_topCard">
                <el-table :data="filerInfoData" style="width: 100%" max-height="700px" stripe>
                    <el-table-column type="index"> </el-table-column>
                    <el-table-column prop="field_name" label="特征名称" width="170">
                    </el-table-column>
                    <el-table-column prop="characterization" label="特征描述" width="170">
                    </el-table-column>
                    <el-table-column prop="in_disease" label="所属疾病" width="170">
                    </el-table-column>
                    <el-table-column prop="category" label="所属类别" width="170">
                    </el-table-column>
                    <el-table-column prop="standard" label="是否为疾病标准指标" width="170">
                    </el-table-column>
                    <el-table-column prop="data_type" label="数据类型" width="170">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scoped">
                            <el-button type="primary" icon="el-icon-edit" circle
                                @click="editTable(tempTableName,scoped.row,scoped.$index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-dialog :title="tableForm_new.field_name" :visible.sync="tableFormVisable" width="40%"
            :before-close="handleClose">
            <el-form ref="tableFormRef" :model="tableForm_new" label-width="160px" style="margin-left:15%">
                <el-form-item label="特征描述：" prop="characterization">
                    <el-input v-model="tableForm_new.characterization" style="width:49%"></el-input>
                </el-form-item>
                <el-form-item label="所属疾病：" prop="in_disease">
                    <el-select v-model="tableForm_new.in_disease">
                        <el-option-group
                        v-for="group in diseaseOptions"
                        :key="group.label"
                        :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
    import { treeData, treeDataDialog } from "@/components/tab/treeTargetData.js";
    import { tableInfoData, tableInfoData2 } from "@/components/tab/TableData.js";

    let id = 1000;

    export default {
        data() {
            return {
                // 获取虚拟树形结构数据
                treeData: JSON.parse(JSON.stringify(treeData)),
                // 获取虚拟表格数据
                tableInfoData: JSON.parse(JSON.stringify(tableInfoData)),
                
                treeDialogData: JSON.parse(JSON.stringify(treeDataDialog)),

                filerInfoData : [],

                dialogDiseaseVisible: false,

                dialogDiseaseVisible2: false,

                characterVisible: false,

                nodeData: {},

                characterOptListId: 0,

                characterOptList_Arr: [
                    [
                        {
                            characterId: 1,
                            chName: '诊断2'
                        },
                        {
                            characterId: 2,
                            chName: '诊断3'
                        },
                        {
                            characterId: 3,
                            chName: '诊断4'
                        },
                        {
                            characterId: 4,
                            chName: '诊断5'
                        },
                        {
                            characterId: 5,
                            chName: '诊断6'
                        },
                        {
                            characterId: 6,
                            chName: '诊断7'
                        },
                        {
                            characterId: 7,
                            chName: '诊断8'
                        },
                    ],
                    [
                        {
                            characterId: 8,
                            chName: '检查1'
                        },
                        {
                            characterId: 9,
                            chName: '检查2'
                        },
                        {
                            characterId: 10,
                            chName: '检查3'
                        },
                        {
                            characterId: 11,
                            chName: '检查4'
                        },
                        {
                            characterId: 12,
                            chName: '检查5'
                        },
                        {
                            characterId: 13,
                            chName: '检查6'
                        },
                        {
                            characterId: 14,
                            chName: '检查7'
                        },
                        {
                            characterId: 15,
                            chName: '检查8'
                        },
                    ],
                ],

                // 多选框
                checkAll: false,
                checkedCharacter: [],
                characterOptList: [],

                diseaseName:'',
                tableNameList: [],
                //tableData: [],
                isView: false,
                rowid: 0,
                pagenum: 1,
                pagesize: 10,
                total: 0,
                tempTableName: '',
                tempTbaleType: "",
                tableForm: {
                    field_name: '',
                    characterization: '',
                    in_disease: '',
                    category: '',
                    standard: '',
                    is_standard: 1,
                    data_type: ''
                },
                tableForm_new: {
                    field_name: '',
                    characterization: '',
                    in_disease: '',
                    category: '',
                    standard: '',
                    is_standard: 1,
                    data_type: ''
                },
                tableFormVisable: false,
                showValue: '疾病标准特征',
                standardOptions: [{
                    value: '1',
                    label: '是'
                }, {
                    value: '0',
                    label: '否'
                }],
                typeOptions: [{
                    value: '1',
                    label: 'int'
                }, {
                    value: '2',
                    label: 'float'
                }, {
                    value: '3',
                    label: 'double'
                }, {
                    value: '4',
                    label: 'bool'
                }, {
                    value: '5',
                    label: 'string'
                }],
                diseaseNormalOptions: [
                {
                    value: '1',
                    label: '全部特征'
                }, {
                    value: '2',
                    label: '疾病标准特征'
                }, {
                    value: '3',
                    label: '非疾病标准特征'
                }],
                diseaseOptions: [
                {
                    label: '糖尿病',
                    options: [{
                        value: '1',
                        label: '一型糖尿病'
                    }, {
                        value: '2',
                        label: '二型糖尿病'
                    }]
                }, {
                    label: '肺病',
                    options: [{
                        value: '3',
                        label: 'xxx肺病'
                    }, {
                        value: '4',
                        label: 'xx肺病'
                    }]
                }],
            }
        },
        created() {
            this.getTableNameList();
            this.filerInfoData = this.tableInfoData.filter(item => item.is_standard === 1)
        },
        methods: {
            append() {
                const newChild = { id: id++, label: this.diseaseName, isLeafs: true};
                if (!this.nodeData.children) {
                    this.$set(this.nodeData, 'children', []);
                }
                this.nodeData.children.push(newChild);
                this.nodeData = {};
                this.cleanInput();
                this.characterId = 0
                this.characterVisible = false;
            },

            appendDisease() {
                const newChild = { id: id++, label: this.diseaseName, children:[], isLeafs: false};
                if (!this.nodeData.children) {
                    this.$set(this.nodeData, 'children', []);
                }
                this.nodeData.children.push(newChild);
                this.nodeData = {};
                this.cleanInput();
                this.dialogDiseaseVisible2 = false;
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

            addCharacteration(){
                this.characterVisible = true
                this.characterOptList = this.characterOptList_Arr[0]
            },

            handleCheckChange(data, checked) {
                if (checked) {
                    this.$refs.tree.setCheckedKeys([data.id])
                }else {
                    this.dataTableShow = false
                }
            },

            changeData(data) {
                if (data.isLeafs && data.label == '一型糖尿病') {
                    this.dataTableShow = true
                    this.filerInfoData = JSON.parse(JSON.stringify(tableInfoData)).filter(item => item.is_standard === 1)
                    this.showValue = '疾病标准特征'
                } else if (data.isLeafs && data.label != '一型糖尿病') {
                    this.filerInfoData = JSON.parse(JSON.stringify(tableInfoData2)).filter(item => item.is_standard === 1)
                    this.dataTableShow = true
                    this.showValue = '疾病标准特征'
                }
            },

            markNode(data){
                this.nodeData = data
            },

            cleanInput(){
                this.dialogDiseaseVisible = false;
                this.dialogDiseaseVisible2 = false;
                this.diseaseName = ""
            },

            filterData(){
                if(this.showValue == '2'){
                    this.filerInfoData = this.tableInfoData.filter(item => item.is_standard === 1)
                } else if(this.showValue == '1'){
                    this.filerInfoData = this.tableInfoData
                } else if(this.showValue == '3'){
                    this.filerInfoData = this.tableInfoData.filter(item => item.is_standard === 0)
                }
            },

            handleCheckAllChange(val) {
                if(val){
                    this.checkedCharacter = this.characterOptList
                    console.log(this.checkedCharacter);
                }else{
                    this.checkedCharacter = []
                }
            },

            handleCheckedCharacterChange(value) {
                console.log(this.checkedCharacter);
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.characterOptList.length;
            },

            cleanCheckBox() {
                this.checkAll = false
                this.checkedCharacter = []
            },

            submitUpdate(){
                if(this.tableForm_new.standard == '0'){
                    this.tableForm_new.is_standard = 0
                    this.tableForm_new.standard = '否'
                }else{
                    this.tableForm_new.is_standard = 1
                    this.tableForm_new.standard = '是'
                }
                if(this.tableForm_new.in_disease == '1'){
                    this.tableForm_new.in_disease='一型糖尿病'
                }else if(this.tableForm_new.in_disease == '2'){
                    this.tableForm_new.in_disease='二型糖尿病'
                }else if(this.tableForm_new.in_disease == '3'){
                    this.tableForm_new.in_disease='xxx肺病'
                }else if(this.tableForm_new.in_disease == '4'){
                    this.tableForm_new.in_disease='xxx肺病'
                }
                if(this.tableForm_new.data_type == '1'){
                    this.tableForm_new.data_type='int'
                }else if(this.tableForm_new.data_type == '2'){
                    this.tableForm_new.data_type='float'
                }else if(this.tableForm_new.data_type == '3'){
                    this.tableForm_new.data_type='double'
                }else if(this.tableForm_new.data_type == '4'){
                    this.tableForm_new.data_type='bool'
                }else if(this.tableForm_new.data_type == '5'){
                    this.tableForm_new.data_type='string'
                }
                this.filerInfoData[this.rowid].characterization = this.tableForm_new.characterization
                this.filerInfoData[this.rowid].in_disease = this.tableForm_new.in_disease
                this.filerInfoData[this.rowid].category = this.tableForm_new.category
                this.filerInfoData[this.rowid].standard = this.tableForm_new.standard
                this.filerInfoData[this.rowid].is_standard = this.tableForm_new.is_standard
                this.filerInfoData[this.rowid].data_type = this.tableForm_new.data_type
                this.tableFormVisable = false;
                this.filerInfoData = (this.filerInfoData).filter(item => item.is_standard === 1)
            },

            exchangeCharacterList(id) {
                this.characterOptList = this.characterOptList_Arr[id]
                this.characterOptListId = id
            },

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
            editTable(tempTableName, row, id) {
                this.tableForm = row;
                this.rowid = id;
                this.tableForm_new = JSON.parse(JSON.stringify(row));
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
        margin-top: 15px;
        left: 1%;
    }

    .right_table {
        display: inline-block;
        height: auto;
        width: 75%;
        position: absolute;
    }

    .dialog-footer {
        
    }
</style>