<template>
  <div>
    <v-card-title>
      <v-layout column align-start>
        <div class="subtitle-1 font-weight-bold mb-1 ">详细评分</div>
      </v-layout>
    </v-card-title>
    <v-container>
      <div class="chart" id="sectionscore" style="min-height:300px;height:100%"></div>
    </v-container>
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
      require("echarts/lib/chart/radar");
      require("echarts/lib/component/tooltip");
      var myChart = echarts.init(document.getElementById("sectionscore"));

      myChart.setOption({
        textStyle: {
          color: "rgba(255,255,255,0.7)",
          // textShadowColor: "#bf00ff",
          // textShadowBlur: 7
        },
        title: {
          text: "基础雷达图"
        },
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）"]
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          shape: "circle",
          indicator: [
            { name: "销售", max: 6500 },
            { name: "管理", max: 16000 },
            { name: "信息技术", max: 30000 },
            { name: "客服", max: 38000 },
            { name: "研发", max: 52000 },
            { name: "市场", max: 25000 }
          ],
          name: {
            textStyle: {
              color: "rgb(255, 255, 255)"
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(255, 255, 255, 0.1)",
                "rgba(255, 255, 255, 0.2)",
                "rgba(255, 255, 255, 0.4)",
                "rgba(255, 255, 255, 0.6)",
                "rgba(255, 255, 255, 0.8)",
                "rgba(255, 255, 255, 1)"
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255, 0.5)"
            }
          }
        },
        grid: {
          top: "20%",
          left: "5%",
          right: "3%",
          bottom: "10%",
          containLabel: true
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）"
              }
            ],
            symbol: "none",
            itemStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(18, 164, 240, 0.8)" // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: "rgba(18, 164, 240, 0.1)" // bottom 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(18, 164, 240, 0.8)" // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: "rgba(18, 164, 240, 0.1)" // bottom 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
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


