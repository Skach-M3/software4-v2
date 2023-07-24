<template>
  <div id="mychart" ref="mychart"></div>
</template>
<script>
import * as echarts from "echarts";
import svg from "@/assets/people.svg";
export default {
  name: "",
  components: {},
  mixins: [],
  props: { selectName: String, hoverName: String },
  data() {
    return {
      // selectName: '',
      // hoverName: '',
      outName: "",
      myChart: "",
    };
  },
  computed: {},
  watch: {
    hoverName() {
      // console.log(this.hoverName);
      if (this.outName != this.hoverName) {
        this.downplay(this.outName);
      }
      if (this.hoverName) {
        this.outName = this.hoverName;
        this.highlight(this.hoverName);
      }
    },
    selectName(){
      if (this.outName) {
        this.downplay(this.outName);
      }
      this.highlight(this.selectName);
    }
  },
  mounted() {
    this.initMyChart();
  },
  methods: {
    downplay(downplayName) {
      this.myChart.dispatchAction({
        type: "downplay",
        geoIndex: 0,
        name: downplayName,
      });
    },
    highlight(highlightName) {
      this.myChart.dispatchAction({
        type: "highlight",
        // seriesIndex:0,
        geoIndex: 0,
        name: highlightName,
      });
    },
    initMyChart() {
      //   var ROOT_PATH = "server";
      // var chartDom = document.getElementById("mychart");
      var chartDom = this.$refs.mychart;
      var myChart = echarts.init(chartDom);
      this.myChart = myChart;
      var option;
      // console.log(myChart);
      var svglink = svg;

      fetch(svglink)
        .then((response) => response.text())
        .then((res) => {
          //   console.log(res);
          echarts.registerMap("organ_diagram", { svg: res });
          option = {
            // backgroundColor: '#fff', // 设置底色
            tooltip: {},
            geo: {
              // left: '-10%',
              // right: "50%",
              itemStyle: {
                color: null,
              },
              top: "5%",
              map: "organ_diagram",
              selectedMode: "single",
              emphasis: {
                focus: "self",
                itemStyle: {
                  color: null,
                },
                label: {
                  position: "bottom",
                  distance: 0,
                  textBorderColor: "#fff",
                  textBorderWidth: 2,
                },
              },
              blur: {},
              select: {
                itemStyle: {
                  color: "",
                  opacity:0.8
                },
                label: {
                  show: false,
                  textBorderColor: "#fff",
                  textBorderWidth: 2,
                },
              },
            },
          };
          this.myChart.setOption(option);
          this.myChart.on("mouseover", (event) => {
            // console.log(this.selectName)

            // this.$emit("hover", event.name);
            if (this.outName != this.hoverName) {
              this.downplay(event.name);
            }
            if (this.hoverName) {
              this.outName = event.name;
              this.highlight(event.name);
            }
          });
          this.myChart.on("mouseout", () => {
            if (this.outName) {
              this.downplay(this.outName);
            }
            if (this.selectName) {
              this.outName = this.selectName;
              // console.log(this.selectName)
              this.highlight(this.selectName);
            }
       
          });
          this.myChart.on("click", (event) => {
            this.$emit("select", event.name);
          });
          option && this.myChart.setOption(option);
        });
    },
  },
};
</script>
<style scoped>
#mychart {
  width: 100%;
  height: 100%;
  transform: translateX(-5%);
  background-color: aliceblue;
}
</style>
