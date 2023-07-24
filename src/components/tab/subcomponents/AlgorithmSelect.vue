<template>
  <div>
    <el-container>
      <el-tabs id="modelList"  v-model="model" tab-position="left">
        <el-tab-pane label="算法1">算法1</el-tab-pane>
        <el-tab-pane label="算法1" disabled="true">算法1</el-tab-pane>
        <el-tab-pane label="算法2" disabled="true">算法2</el-tab-pane>
        <el-tab-pane label="算法3" disabled="true">算法3</el-tab-pane>
        <el-tab-pane label="算法4" disabled="true">算法4</el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AlgorithmSelect",
  data() {
    return {};
  },
};
</script>

<style scoped>
#modelList{
  height: 60vh;
  margin-bottom: 5vh;
}
</style>
