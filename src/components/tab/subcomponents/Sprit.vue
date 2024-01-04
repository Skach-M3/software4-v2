<template>
  <div id="sprit" ref="sprit"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Sprit",
  props: {
    title_text: {
      type: String,
      default: "进度图",
    },
    data: {
      type: Object,
      default: () => { },
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
      var chartDom = this.$refs.sprit;
      var myChart = echarts.init(chartDom);
      const spirit ='image:';
      var maxData = 100;
      var option = {
        tooltip: {},
        xAxis: {
          max: maxData,
          splitLine: { show: false },
          offset: 10,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            margin: 10
          }
        },
        yAxis: {
          data: ['数据集1', '数据集2', '数据集3', '数据集4'],
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 10,
            color: '#999',
            fontSize: 16
          }
        },
        grid: {
          top: 'center',
          height: 200,
          left: 70,
          right: 100
        },
        series: [
          {
            // current data
            type: 'pictorialBar',
            symbol: spirit,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbolClip: true,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: [85, 65, 90, 100],
            markLine: {
              symbol: 'none',
              label: {
                formatter: 'max: {c}',
                position: 'start'
              },
              lineStyle: {
                color: 'green',
                type: 'dotted',
                opacity: 0.2,
                width: 2
              },
              data: [
                {
                  type: 'max'
                }
              ]
            },
            z: 10
          },
          {
            // full data
            type: 'pictorialBar',
            itemStyle: {
              opacity: 0.2
            },
            label: {
              show: true,
              formatter: function (params) {
                return ((params.value / maxData) * 100).toFixed(1) + ' %';
              },
              position: 'right',
              offset: [10, 0],
              color: 'green',
              fontSize: 18
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbol: spirit,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: [891, 1220, 660, 1670],
            z: 5
          }
        ]
      };
      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
#sprit {
  width: 100%;
  height: 100%;
}
</style>
