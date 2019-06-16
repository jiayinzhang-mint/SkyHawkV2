<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-center>
        <div class="body-1 font-weight-bold mb-1 neon">系统存储</div>
      </v-layout>
    </v-card-title>
    <div id="storagestatus" style="min-height:120px;height:100%" class="chart" ref="echarts"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    init() {
      var echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/pie");
      require("echarts/lib/component/tooltip");
      require("echarts/lib/component/graphic");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("storagestatus"));
      // 绘制图表

      myChart.setOption({
        textStyle: {
          color: "rgba(255,255,255,0.7)",
          textShadowColor: "#bf00ff",
          textShadowBlur: 7
        },
        color: ["#5bb0e7", "#405460"],
        tooltip: {
          textStyle: {
            color: "#fff"
          },
          trigger: "item",
          formatter: "{b} : {c} %"
        },
        grid: {
          top: "10px",
          left: "20%",
          right: "20%",
          bottom: "0",
          containLabel: true
        },
        graphic: {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: "test",
            textAlign: "center",
            font: "bold 15px sans-serif",
            fill: "#fff",
            width: 30,
            height: 30
          }
        },
        series: [
          {
            name: "维修状态分布",
            type: "pie",

            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            // data: this.data.sort(function(a, b) {
            //     return a.value - b.value;
            // }),

            label: {
              show: false
            },
            labelLine: {
              show: false
            },

            animationType: "scale",
            animationEasing: "elasticOut"
          }
        ]
      });
      this.myChart = myChart;
    },
    setData() {
      this.myChart.setOption({
        series: [
          {
            data: [
              { value: Math.round(this.systemStatistic.disk[3]), name: "占用" },
              {
                value: Math.round(100 - this.systemStatistic.disk[3]),
                name: "空余"
              }
            ]
          }
        ],
        graphic: {
          style: {
            text: Math.round(this.systemStatistic.disk[3]) + " %"
          }
        }
      });
    }
  },
  watch: {
    systemStatistic: "setData"
  },
  computed: {
    ...mapGetters({
      systemStatistic: "device/systemStatistic"
    })
  },
  mounted() {
    this.init();
    this.setData();
    setTimeout(() => {
      this.myChart.resize();
    }, 300);
    window.onresize = () => {
      this.myChart.resize();
    };
  }
};
</script>

<style>
</style>
