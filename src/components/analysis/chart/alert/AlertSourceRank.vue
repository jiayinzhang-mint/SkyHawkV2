<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-start>
        <div class="subtitle-1 font-weight-bold mb-1 neon">
          告警来源
          <span class="grey--text">| 昨日</span>
        </div>
      </v-layout>
    </v-card-title>
    <div class="chart" id="alertsourcerank" style="min-height:240px;height:100%"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    myChart: null
  }),
  methods: {
    init() {
      var echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/bar");
      require("echarts/lib/component/tooltip");
      var myChart = echarts.init(document.getElementById("alertsourcerank"));

      myChart.setOption({
        textStyle: {
          color: "rgba(255,255,255,0.7)"
        },
        dataset: {
          source: [
            ["amount", "product"],
            [582, "执法大队"],
            [782, "南京西路"],
            [410, "大宁路"],
            [127, "芷江西路"],
            [201, "共和新路"],
            [791, "彭浦新村"]
          ]
        },
        grid: {
          top: "10px",
          left: "5%",
          right: "15%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          name: "次数",
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.1)"
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.1)"
            }
          }
        },
        yAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.1)"
            }
          }
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "amount",
              // Map the "product" column to Y axis
              y: "product"
            },
            itemStyle: {
              normal: {
                color: "#909fec"
              }
            },
            barWidth: 12
          }
        ]
      });
      this.myChart = myChart;
    }
  },
  async mounted() {
    this.init();
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
