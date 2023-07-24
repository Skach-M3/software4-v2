<template>
  <div ref="board" id="board"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Board",
  components: {},
  mixins: [],
  props: { rate: Number},
  data() {
    return {
    };
  },
  mounted() {
    this.initMyChart();
  },
  methods: {
    initMyChart() {
      var chartDom = this.$refs.board;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'inherit'
              }
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 40,
              fontSize: 20
            },
            detail: {
              valueAnimation: true,
              formatter: `您的心脏病风险是${this.rate}%`,
              color: 'inherit'
            },
            data: [
              {
                value: this.rate
              }
            ]
          }
        ]
      };
      // setInterval(function () {
      //   console.log(this.rate);
      //   myChart.setOption({
      //     series: [
      //       {
      //         data: [
      //           {
      //             value: this.rate
      //           }
      //         ]
      //       }
      //     ]
      //   });
      // }, 1000);

      option && myChart.setOption(option);
    },
  },
};
</script>

<style>
#board{
  width: 100%;
  height: 100%;
}
</style>