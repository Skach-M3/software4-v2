<template>
  <div id="graph" ref="graph"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Graph",
  props:{
    title_text:{
      type:String,
      default:"关系图",
    },
    node:{
      type:Array,
      default:()=>{}
    },
    links:{
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
      var chartDom = this.$refs.graph;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: this.title_text,
          subtext:"下层是目标节点，上层为关联节点"
        },
        toolbox:{
          show: true
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 60,//节点大小
            roam: true,
            label: {//节点标识
              show: true,
            },
            // edgeSymbol: ["circle", "arrow"],//箭头形状
            // edgeSymbolSize: [4, 10],
            edgeLabel: {//边上标识
              fontSize: 20,
            },
            data: this.node,
            // [
            //   {
            //     name: "Node 1",
            //     x: 300,
            //     y: 500,
            //   },
            //   {
            //     name: "Node 2",
            //     x: 800,
            //     y: 300,
            //   },
            //   {
            //     name: "Node 3",
            //     x: 550,
            //     y: 100,
            //   },
            //   {
            //     name: "Node 4",
            //     x: 550,
            //     y: 500,
            //   },
            // ],
            links: this.links,
            // [
            //   {
            //     source: 0,
            //     target: 1,
            //     symbolSize: [5, 20],
            //     label: {
            //       show: true,
            //     },
            //     lineStyle: {
            //       width: 5,
            //       curveness: 0.2,
            //     },
            //   },
            //   {
            //     source: "Node 2",
            //     target: "Node 1",
            //     label: {
            //       show: true,
            //     },
            //     lineStyle: {
            //       curveness: 0.2,
            //     },
            //   },
            //   {
            //     source: "Node 1",
            //     target: "Node 3",
            //   },
            //   {
            //     source: "Node 2",
            //     target: "Node 3",
            //   },
            //   {
            //     source: "Node 2",
            //     target: "Node 4",
            //   },
            //   {
            //     source: "Node 1",
            //     target: "Node 4",
            //   },
            // ],
            lineStyle: {
              opacity: 0.9,
              width: 3,
              curveness: 0,
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
#graph{
  width: 100%;
  height: 100%;
}
</style>
