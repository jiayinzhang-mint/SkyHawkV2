<template>
  <v-app dark class="dashboard">
    <v-toolbar dark flat tabs color="rgb(47,50,58)">
      <v-toolbar-title class="ml-2 font-weight-bold" style="font-size:20px !important">SkyHawk</v-toolbar-title>
      <v-toolbar-title class="title-des ml-2">数据仪表板</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="getInstantData()">
        <v-icon>refresh</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-model="model" left color="transparent" slider-color="primary" show-arrows>
          <v-tab
            @click="alterTab(item)"
            v-for="(item,i) in stationListShow"
            :key="i"
            :href="`#tab-${i}`"
          >{{item.name}}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-divider></v-divider>

    <v-tabs-items v-model="model">
      <v-tab-item v-for="(item,i) in stationListShow" :key="i" :value="`tab-${i}`">
        <v-card flat></v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-container fluid grid-list-md>
      <v-layout row wrap fill-height>
        <v-flex xs5>
          <div class="wrapper wrapper-v" style="max-height:100%">
            <div class="widget border" style="grid-row:1">
              <alert-count-trend></alert-count-trend>
            </div>
            <div class="widget border" style="grid-row:2">
              <alert-type-trend></alert-type-trend>
            </div>
          </div>
        </v-flex>
        <v-flex
          xs5
          style="border-right: thin solid rgba(200,200,200,0.2);border-left: thin solid rgba(200,200,200,0.2);"
        >
          <div class="wrapper" style="max-height:100%">
            <v-layout row wrap>
              <v-flex xs3>
                <system-status></system-status>
              </v-flex>
              <v-flex xs3>
                <storage-status></storage-status>
              </v-flex>
              <v-flex xs3>
                <online-device></online-device>
              </v-flex>
              <v-flex xs3>
                <online-user></online-user>
              </v-flex>
              <v-flex xs6>
                <alert-type-distribution></alert-type-distribution>
              </v-flex>
              <v-flex xs6>
                <alert-status-distribution></alert-status-distribution>
              </v-flex>
              <v-flex xs6>
                <alert-source-rank></alert-source-rank>
              </v-flex>
              <v-flex xs6>
                <black-list></black-list>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs2>
          <div class="wrapper" style="max-height:100%">
            <v-layout row wrap>
              <v-flex xs6>
                <alert-count dashboard></alert-count>
              </v-flex>
              <v-flex xs6>
                <alert-company dashboard></alert-company>
              </v-flex>
              <v-flex xs6>
                <unprocessed-alert dashboard></unprocessed-alert>
              </v-flex>
              <v-flex xs6>
                <processed-alert dashboard></processed-alert>
              </v-flex>
              <v-flex xs12>
                <alert-list></alert-list>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

// alert block
import alertCompany from "../block/alert/AlertCompany";
import alertCount from "../block/alert/AlertCount";
import processedAlert from "../block/alert/ProcessedAlert";
import unprocessedAlert from "../block/alert/UnprocessedAlert";
import wrongAlert from "../block/alert/WrongAlert";
import alertList from "../block/alert/AlertList";

// alert chart
import alertTypeDistribution from "../chart/alert/AlertTypeDistribution";
import alertStatusDistribution from "../chart/alert/AlertStatusDistribution";
import alertSourceRank from "../chart/alert/AlertSourceRank";
import alertCountTrend from "../chart/alert/AlertCountTrend";
import alertTypeTrend from "../chart/alert/AlertTypeTrend";

// company
import blackList from "../chart/company/BlackList";

// device block
import onlineDevice from "../chart/device/OnlineDevice";

// system block
import systemStatus from "../chart/system/SystemStatus";
import storageStatus from "../chart/system/StorageStatus";

// user block
import onlineUser from "../chart/user/OnlineUser";

// other block
import weather from "../block/others/Weather";
import postList from "../block/billboard/PostList";

import dashboardShortcut from "../../../shortcut/Dashboard";
import { setInterval } from "timers";

export default {
  components: {
    alertCompany,
    alertCount,
    alertCountTrend,
    alertTypeTrend,
    processedAlert,
    unprocessedAlert,
    wrongAlert,
    onlineDevice,
    onlineUser,
    alertTypeDistribution,
    alertStatusDistribution,
    alertSourceRank,
    systemStatus,
    storageStatus,
    weather,
    postList,
    blackList,
    alertList
  },
  data() {
    return {
      model: "tab-0",
      stationListShow: []
    };
  },
  methods: {
    getStationList() {
      this.stationListShow.push({
        id: 1,
        name: "静安区"
      });
      for (let i = 0; i < this.stationList.length; i++) {
        if (this.stationList[i].id != 14) {
          this.stationListShow.push(this.stationList[i]);
        }
      }
      console.log(this.stationListShow);
    },
    getInstantData() {
      dashboardShortcut.getInstantData();
      dashboardShortcut.getOrganizationCalculateData(
        1,
        10,
        this.userInfo.station
      );
    },
    alterTab(item) {
      console.log(item);
      dashboardShortcut.getOrganizationCalculateData(1, 10, item.id);
    }
  },
  computed: {
    ...mapGetters({
      stationList: "organization/stationList",
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    this.getStationList();
    dashboardShortcut.getInstantData();
  }
};
</script>

<style>
.wrapper {
  display: grid;
  grid-auto-rows: auto;
  justify-items: stretch;
  align-items: stretch;
  align-content: stretch;
  justify-content: stretch;
  height: 100%;
  box-sizing: border-box;
}

.wrapper-v {
  grid-template-columns: repeat(1, 1fr);
}
</style>
