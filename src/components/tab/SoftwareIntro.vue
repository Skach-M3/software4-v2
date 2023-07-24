<template>
  <div>
    <div class="container">
      <div style="font-size: 50px">多病种疾病风险预测工具软件</div>
      <div class="size-icon">
        <div v-for="(item, index) in quickEntry" :key="index" class="icon">
          <div class="singleBox" @click="quickLink(index)">
            <img
              :src="item.img"
              class="imgStyle"
              style="border-radius: 15px"
            />
            <h3 style="font-size: 30px">{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  data(){
    return {
      quickEntry: [
        {
          title: "数据管理",
          img: require("@/assets/book.png"),
          router: "/DieaseIntro",
        },
        {
          title: "任务管理",
          img: require("@/assets/model_intro.png"),
          router: "",
        },
        {
          title: "疾病危险因素挖掘",
          img: require("@/assets/danLiYuCe.png"),
          router: "/Predict",
        },
        {
          title: "危险因素相关因素挖掘",
          img: require("@/assets/batch.png"),
          router: "/Predict",
        }
      ],
    }
  },

  methods:{
    quickLink(index) {
      this.$router.push(this.quickEntry[index].router);
    },
  }
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
.size-icon {
  font-size: 80px;
  display: grid;

  grid-template-columns: repeat(2, 300px);
  grid-template-rows: repeat(2, 300px);
  gap: 5px;
  justify-items: center;
  align-items: center;
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
</style>