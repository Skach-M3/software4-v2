<template>
    <div class="inter">
        <el-button type="primary" round @click="toUser">用户界面</el-button>
        <el-button type="success" round @click="toManage">管理员界面</el-button>
    </div>
</template>

<script>
export default {
    name:'LogIN',
    methods: {
        toUser(){
            this.$router.push('/UserSideBar');
        },
        toManage(){
            this.$router.push('/sideBar');
        }
    }
}
</script>

<style scoped>
    .inter{
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top: 10%;

    }
</style>