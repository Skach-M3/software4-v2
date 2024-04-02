<template>
  <div id="bar" ref="bar"></div>
</template>

<script>
import * as echarts from "echarts";
import $ from 'jquery';
export default {
  name: "Bar",
  props: {
    title_text: {
      type: String,
      default: "柱状图",
    },
    bar_x: {
      type: Array,
      default: () => { },
    },
    bar_neg: {
      type: Array,
      default: () => { },
    },
    bar_pos: {
      type: Array,
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
      var chartDom = document.getElementById('bar');
      var myChart = echarts.init(chartDom);
      var option;

      myChart.showLoading();


      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
           data: ['正例', '负例']
        },
        xAxis: [
          {
            type: 'category',
            data: this.bar_x,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '样本数量',
            min: 0,
            // max: 1000,
            interval: 50,
            axisLabel: {
              formatter: '{value} 个'
            }
          },
        ],
        series: [
          {
            name: '正例',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 个';
              }
            },
            data: this.bar_pos
          },
          {
            name: '负例',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 个';
              }
            },
            data: this.bar_neg
          },
        ]
      };
      option && myChart.setOption(option);
      myChart.hideLoading();
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
