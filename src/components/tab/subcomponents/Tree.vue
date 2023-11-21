<template>
  <div id="tree" ref="tree"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Tree",
  props: {
    title_text: {
      type: String,
      default: "关系图",
    },
    data: {
      type: Object,
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
      var chartDom = this.$refs.tree;
      var myChart = echarts.init(chartDom);
      var option;
      option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [this.data],
          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',
          symbolSize: 30,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 15
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
          animationEasingUpdate: "quinticInOut",
          roam: true,
        }
      ]
    }

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
#tree {
  width: 100%;
  height: 100%;
}
</style>
