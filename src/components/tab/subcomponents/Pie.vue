<template>
  <div id="pie" ref="pie"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Pie",
  props: {
    title_text: {
      type: String,
      default: "专病集疾病占比",
    },
    pieObject: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {

    };
  },
  created() {


  },
  mounted() {
    this.initMyChart();
  },

  methods: {
    initMyChart() {
      var chartDom = this.$refs.pie;
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: this.title_text,
          subtext: '样本数据',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.pieObject,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
#pie {
  width: 100%;
  height: 100%;
}
</style>
