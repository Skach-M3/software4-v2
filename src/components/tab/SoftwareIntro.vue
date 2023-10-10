<template>
  <div>
    <div class="container">
      <div style="font-size: 50px">多病种疾病危险因素关联关系挖掘工具软件</div>
      <div class="size-icon1">
        <div v-for="(item, index) in quickEntry" :key="index" class="icon">
          <div class="singleBox" @click="quickLink(item.router)">
            <img :src="item.img" class="imgStyle" style="border-radius: 15px" />
            <h3 style="font-size: 30px">{{ item.title }}</h3>
          </div>
        </div>
        <div class="size-icon2">
          <div class="icon">
            <div class="singleBox" @click="quickLink('DisFactor')">
              <img
                src="@/assets/danLiYuCe.png"
                class="imgStyle"
                style="border-radius: 15px"
              />
              <h3 style="font-size: 30px">疾病危险因素挖掘</h3>
            </div>
          </div>
          <div class="icon">
            <div class="singleBox" @click="quickLink('F_Factor')">
              <img
                src="@/assets/batch.png"
                class="imgStyle"
                style="border-radius: 15px"
              />
              <h3 style="font-size: 30px">危险因素相关因素挖掘</h3>
            </div>
          </div>
          <div class="icon">
            <div class="singleBox" @click="quickLink('FactorDis')">
              <img
                src="@/assets/-research.png"
                class="imgStyle"
                style="border-radius: 15px"
              />
              <h3 style="font-size: 30px">危险因素相关疾病挖掘</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  data() {
    return {
      quickEntry: [
        {
          title: "数据管理",
          img: require("@/assets/book.png"),
          router: "dataManage",
        },
        {
          title: "任务管理",
          img: require("@/assets/model_intro.png"),
          router: "TaskManage",
        },
      ],
    };
  },

  methods: {
    quickLink(router) {
      this.$router.push(router);
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-flow: column;
}
.size-icon1 {
  font-size: 80px;
  display: grid;

  grid-template-columns: repeat(2, 300px);
  /* grid-template-rows: repeat(2, 300px); */
  gap: 5px;
  justify-items: center;
  align-items: center;
  margin-top: 30px;
}
.size-icon2 {
  font-size: 80px;
  display: grid;

  grid-template-columns: repeat(3, 400px);
  /* grid-template-rows: repeat(2, 300px); */
  gap: 5px;
  justify-items: center;
  align-items: center;
  margin-top: 50px;
  margin-left: 17vw;
}
.icon {
  display: grid;
  place-items: center;
  text-align: center;
}
.icon svg-icon {
  max-width: 100%;
  vertical-align: middle;
}
.icon h3 {
  margin-top: 10px;
}
.imgStyle {
  height: 150px;
  width: 150px;
}
</style>
