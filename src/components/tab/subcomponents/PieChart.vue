<template>
  <div id="pie" ref="pie"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "PieChart",
  props: { 
    data:{
      type: Array,
      default: ()=> []
    }, 
    title:{
      type: String,
      default: ''
    }, 
    subtitle:{
      type:String,
      default: ''
    }
    },
  data(){
    return {
    }  
  },

  mounted(){
    this.initMyChart();
  },

  methods:{
    initMyChart(){
      var chartDom = this.$refs.pie;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: this.title,
          subtext: this.subtitle,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        toolbox: {
          // show: true,
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
        series: [
          {
            // name: '危险因素权重',
            type: 'pie',
            radius: '50%',
            center: ['50%', '40%'],
            // roseType: 'area',
            itemStyle: {
              borderRadius: 0
            },
            data: this.data
          },
        ],
        // legend: {
        //   orient: 'vertical',
        //   left: 'left'
        // }
      };

      option && myChart.setOption(option);
    }
  }
}
</script>

<style>
#pie{
  width: 100%;
  height: 100%;
}
</style>