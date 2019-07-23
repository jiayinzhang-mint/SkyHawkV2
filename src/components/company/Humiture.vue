<template>
  <div>
    <v-toolbar class="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black">近期监测数据</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="subtitle-1 font-weight-black">监控点</div>
      <v-toolbar-items class="ml-2">
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" text>
              {{indexList[selectedIndex]}}
              <v-icon>expand_more</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, index) in indexList" :key="index" @click="filter(index)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-tabs v-model="tab" centered icons-and-text>
      <v-tabs-slider></v-tabs-slider>
      <v-tab key="1" @click="alterChart('temperature')">
        温度
        <v-icon>whatshot</v-icon>
      </v-tab>
      <v-tab key="2" @click="alterChart('humidity')">
        湿度
        <v-icon>bubble_chart</v-icon>
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-card flat color="transparent">
      <v-container>
        <div id="humiture" style="min-height:400px;height:100%"></div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import companyService from "../../service/CompanyService";
import arrUtil from "../../utils/ArrUtil";
export default {
  data() {
    return {
      tab: 0,
      humiture: [],
      myChart: null,
      humitureShow: [],
      humitureClassified: [],
      indexList: [],
      selectedIndex: null
    };
  },
  methods: {
    init() {
      var echarts = require("echarts/lib/echarts");
      require("echarts/lib/chart/line");
      require("echarts/lib/component/tooltip");
      var myChart = echarts.init(document.getElementById("humiture"));
      // console.log(document.getElementById("humiture"));
      myChart.setOption({
        textStyle: {
          color: "rgba(255,255,255,0.7)"
        },
        grid: {
          top: "5%",
          left: "5%",
          right: "3%",
          bottom: "12%"
        },
        xAxis: {
          type: "time",
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
            return value.min - 5;
          }
        },
        series: [
          {
            type: "line",
            itemStyle: {
              color: "rgb(76, 159, 236)"
            },
            lineStyle: {
              color: "rgb(76, 159, 236)"
            },
            symbol: "emptyCircle",
            smooth: true,
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
    },
    async getHumiture() {
      const rsp = await companyService.getCompanyHumiture(
        this.$route.params.companyId
      );
      if (rsp.humiture.length > 10) {
        this.humiture = rsp.humiture;
        this.humitureClassified = arrUtil.groupArr(rsp.humiture, "index");
        // console.log(this.humitureClassified);
        this.myChart.dataset = {};
        this.humitureClassified.forEach(e => {
          this.indexList.push(e.key);
        });
        this.filter(0);
      }
    },
    filter(id) {
      this.selectedIndex = id;

      this.humitureShow = this.humitureClassified[id].item;
      this.myChart.setOption({
        dataset: {
          dimensions: ["time", "temperature"],
          source: this.humitureShow
        }
      });
      // console.log(this.myChart.dataset);
      // this.chartData.rows = this.humitureShow;
    },
    alterChart(type) {
      var typeName = type == "temperature" ? "温度" : "湿度";

      this.myChart.setOption({
        dataset: {
          dimensions: ["time", type]
        },
        tooltip: {
          formatter: ""
        }
      });
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
    this.getHumiture();
  }
};
</script>

