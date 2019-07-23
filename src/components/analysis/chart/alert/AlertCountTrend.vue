<template>
  <div style="height:100%">
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-start>
        <div class="subtitle-1 font-weight-bold mb-1 neon">
          告警数目
          <span class="grey--text">| 本周</span>
        </div>
      </v-layout>
    </v-card-title>
    <div id="alertcounttrend" style="min-height:250px;height:90%"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    init() {
      var echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/line");
      require("echarts/lib/component/tooltip");
      var myChart = echarts.init(document.getElementById("alertcounttrend"));
      // console.log(document.getElementById("humiture"));
      myChart.setOption({
        textStyle: {
          color: "rgba(255,255,255,0.7)",
          textShadowColor: "#bf00ff",
          textShadowBlur: 7
        },
        grid: {
          top: "5%",
          left: "5%",
          right: "3%",
          bottom: "12%"
        },
        xAxis: {
          type: "category",
          gridIndex: 0,
          boundaryGap: false,
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.1)"
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.1)"
            }
          },
          max: value => {
            return value.max + 5;
          },
          min: value => {
            return value.min;
          }
        },
        series: [
          {
            type: "line",
            itemStyle: {
              color: "rgb(76, 159, 236)"
            },
            lineStyle: {
              color: "rgba(76, 159, 236,0)"
            },
            symbol: "emptyCircle",
            // smooth: true,
            data: [150, 235, 80, 134, 120, 130, 0],
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(18, 164, 240, 0.8)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(18, 164, 240, 0.1)" // bottom 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          }
        ]
      });
      this.myChart = myChart;
    }
  },
  mounted() {
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
