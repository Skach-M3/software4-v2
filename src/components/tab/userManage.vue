<template>
    <div>
        <el-input placeholder="请输入用户名称" v-model="searchUser" class="user_input" clearable @clear="pagehelper()">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <el-button icon="el-icon-search" circle class="user_search_btn" @click="pagehelper()"></el-button>

        <el-divider></el-divider>

        <el-card class="user_list_card">
            <div slot="header" class="clearfix">
                <span>用户列表</span>
                <el-button type="success" round style="margin-left: 90%;"
                    @click="addUserDialogVisible = true">添加用户</el-button>
            </div>

            <el-table :data="currentUserList" stripe style="width: 100%">
                <el-table-column prop="username" label="用户名称" width="400">
                </el-table-column>
                <el-table-column prop="role" label="用户权限" width="400">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.role == '0'">管理员</el-tag>
                        <el-tag v-if="scope.row.role == '1'">普通用户</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间" width="400">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle
                            @click="getInfoUser(scope.row.uid)"></el-button>
                        <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info"
                            icon-color="red" title="确定删除该用户吗？" @confirm="deleteUser(scope.row.uid)">
                            <el-button type="danger" icon="el-icon-delete" circle slot="reference"
                                style="margin-left: 10px;"></el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.params.page" :page-sizes="[6, 9, 12, 15, 24]" :page-size="this.params.size"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total"
                style="margin-top: 2%; margin-left: 3%;">
            </el-pagination>

        </el-card>

        <el-dialog title="新增用户" :visible.sync="addUserDialogVisible">
            <el-form :model="addUserForm" ref="addUserRef" :inline="true">
                <el-form-item label="用户名称" label-width="120">
                    <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" label-width="120">
                    <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>disabled
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" :visible.sync="editUserDialogVisible">
            <el-form :model="showUserForm" ref="editUserRef">
                <el-form-item label="用户名称" label-width="120">
                    <el-input v-model="showUserForm.username" autocomplete="off" disabled size="medium"></el-input>
                </el-form-item>

                <el-tooltip class="item" effect="dark" content="由于密码进行加密操作，此处为密文" placement="top-start">
                    <el-form-item label="用户密码" label-width="120">
                        <el-input v-model="showUserForm.password" autocomplete="off" size="medium"
                            class="pwd_input"></el-input>
                    </el-form-item>
                </el-tooltip>

                <el-form-item label="用户权限" label-width="120">
                    <el-select v-model="showUserForm.role" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册时间" label-width="120" size="medium">
                    <el-input v-model="showUserForm.createTime" autocomplete="off" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEditUser()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { getRequest, postRequest, saveParentDisease } from "@/api/user";
import { resetForm } from "@/components/mixins/mixin";
export default {
    mixins: [resetForm],

    watch: {

    },

    data() {
        return {
            searchUser: '',
            tableData: [],
            total: 0,
            params: {
                page: 1,
                size: 9,
            },
            currentUserList: [],
            addUserDialogVisible: false,
            addUserForm: {
                username: '',
                password: '',
            },
            showUserForm: {
                uid: '',
                username: '',
                password: '',
                role: '',
                createTime: '',
            },
            editUserDialogVisible: false,
            options: [
                {
                    label: '管理员',
                    value: 0
                },
                {
                    label: '普通用户',
                    value: 1
                },
            ]
        };
    },

    created() {
        this.getUserTable();
        this.pagehelper();
    },

    methods: {
        getUserTable() {
            getRequest("/user/getUserList").then(res => {
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.pagehelper();
                }
            })
        },
        handleSizeChange(val) {
            this.params.size = val;
            this.pagehelper();
        },
        handleCurrentChange(val) {
            this.params.page = val;
            this.pagehelper();
        },
        pagehelper() {
            getRequest(`user/selectByPage?pageNum=${this.params.page}&pageSize=${this.params.size}&searchUser=${this.searchUser}`
            ).then((res) => {
                if (res) {
                    this.total = res.data.total;
                    this.currentUserList = res.data.list;
                }
            });
        },
        addUser() {
            postRequest("/user/addUser", this.addUserForm).then(res => {
                if (res.code == 200) {
                    this.$message.success("新增用户成功")
                    this.closeDialog();
                    this.pagehelper();
                }
                else {
                    this.$message.error("新增用户失败")
                    this.closeDialog();
                    this.pagehelper();
                }
            })
        },
        closeDialog() {
            this.addUserDialogVisible = false;
            this.addUserForm.username = '';
            this.addUserForm.password = '';
        },
        deleteUser(uid) {
            getRequest(`user/delete/${uid}`).then(res => {
                if (res.code == 200) {
                    this.$message.success("删除用户成功")
                    this.pagehelper();
                } else {
                    this.$message.error("删除用户失败")
                    this.pagehelper();

                }
            })
        },
        getInfoUser(uid) {
            getRequest(`user/getInfo/${uid}`).then(res => {
                if (res.code == 200) {
                    this.editUserDialogVisible = true;
                    this.showUserForm.username = res.data.username;
                    this.showUserForm.password = res.data.password;
                    this.showUserForm.role = res.data.role;
                    this.showUserForm.createTime = res.data.createTime;
                    this.showUserForm.uid = res.data.uid;
                } else {
                    this.$message.error("获取用户信息失败")
                    this.pagehelper();

                }
            })
        },
        confirmEditUser() {
            postRequest("user/edit", this.showUserForm).then(res => {
                if (res.code == 200) {
                    this.$message.success("修改用户成功")
                    this.pagehelper();
                } else {
                    this.$message.error("修改用户失败")
                    this.pagehelper();

                }
            })
        }
    },

};
</script>

<style scoped>
.user_input {
    width: 20%;
}

.user_search_btn {
    margin-left: 1%;
}
</style>