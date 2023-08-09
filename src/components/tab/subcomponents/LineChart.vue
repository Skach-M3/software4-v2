<template>
  <div id="lineChart" ref="lineChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props:{
    statistic:{
      type:Array,
      default:()=>{}
    },
    x:{
      type:Array,
      default:()=>{}
    }

  },
  data() {
    return {};
  },

  mounted() {
    this.initMyChart();
  },

  methods: {
    initMyChart() {
      var chartDom = this.$refs.lineChart;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: "category",
          data: ["8-2", "8-3", "8-4", "8-5", "8-6", "8-7", "8-9"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
#lineChart{
  width: 100%;
  height: 100%;
}
</style>
