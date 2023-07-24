<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-header id="Header">
            <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" style="color: cornflowerblue"
                    ><i class="el-icon-box"></i>基于多任务学习的多病种疾病风险预测</el-menu-item
                >
                <!--            <template slot="title">当前服务器：</template>-->
                <el-menu-item index="2" style="float: right"
                    ><i class="el-icon-close"></i>退出登录</el-menu-item
                >
                <el-menu-item index="3" style="float: right"
                    ><i class="el-icon-user"></i>欢迎你，xx</el-menu-item
                >
                <el-menu-item index="4" style="float: right"
                    ><i class="el-icon-question"></i
                ></el-menu-item>
            </el-menu>  
        </el-header>

        <el-container>
            <el-aside width="200px" id="Aside"  style="height: 100vh; background-color: rgb(238, 241, 246)" >
                <el-menu
                    default-active="1"
                    router
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                >
                    <el-menu-item index="/UserSideBar/Predict">
                        <i class="el-icon-menu"></i>
                        <span slot="title">风险预测</span>
                    </el-menu-item>
                    <el-menu-item index="/UserSideBar/DieaseIntro">
                        <i class="el-icon-menu"></i>
                        <span slot="title">健康咨询</span>
                    </el-menu-item>
                    <el-menu-item index="/##">
                        <i class="el-icon-menu"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-main id="Main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    
</template>

<script>
export default {
    name:"Predict",
    data() {
        return {
            
        }
    },
    methods:{
        handleSelect(key) {
            if (key == 4) {
                this.$alert("多病种之间具有复杂关联关系，同时多种疾病可能存在某些相同的病征。本软件采用机器学习方法来挖掘多病种之间的复杂关联关系。本软件根据不同疾病的不同使用场景，能够完成数据选择，数据处理，特征选择，模型设置，模型预测等功能。", "软件介绍", {
                confirmButtonText: "确定",
                callback: (action) => {
                    this.$message({
                    type: "info",
                    message: `action: ${action}`,
                    });
                },
                });
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
    }

}
</script>

<style scoped>
    

    #Aside{
        /* background-color: rgb(150, 73, 73); */
        height: 200px;
    }
</style>