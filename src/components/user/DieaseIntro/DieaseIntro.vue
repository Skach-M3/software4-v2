
<template>
  <!-- <h1>这里写人体和疾病介绍</h1> -->
  <!-- <Body></Body> -->
  <div class="container">
    <div class="left">
      <Body :selectName="selectName" @select="select" :hoverName="hoverName" @hover="hover"></Body>
    </div>
    <div class="right">
      <Info :selectName="selectName" @hover="hover"  @select="select"></Info>
    </div>
  </div>
</template>

<script>
import Body from './components/Body.vue'
import Info from './components/Info.vue'
export default {
    // eslint-disable-next-line vue/no-unused-components
    components:{Body:Body,Info:Info},
    data(){
      return {
        selectName: '',
        hoverName: '',
      }
    },
    methods:{
      select(name){
        this.selectName=name
      },
      hover(name){
        this.hoverName=name
      }
    },
    watch:{
    selectName() {
      // console.log(this.selectName);
    },
    hoverName(){
      // console.log(this.hoverName);
    }
  }

}
</script>

<style scoped>
.container {
  /* border: 1px solid rgb(231, 229, 229); */
  display: flex;
  justify-content: space-between;
  /* background-color: #516; */
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.left {
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  flex: 1;
}
.right {

  background-color: rgb(240, 240, 240);
  flex: 2;
  border: 1px solid rgb(231, 229, 229);
}
</style>