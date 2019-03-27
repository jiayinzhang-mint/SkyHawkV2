<template>
  <v-app dark class="dashboard">
    <v-toolbar dark flat tabs color="rgb(47,50,58)">
      <v-toolbar-title class="ml-2 font-weight-bold" style="font-size:20px !important">SkyHawk</v-toolbar-title>
      <v-toolbar-title class="title-des ml-2">数据视图</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="model" left color="transparent" slider-color="primary" show-arrows>
          <v-tab v-for="(item,i) in stationListShow" :key="i" :href="`#tab-${i}`">{{item.name}}</v-tab>
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
      <v-layout row wrap>
        <v-flex xs3>
          <alert-type-distribution></alert-type-distribution>
        </v-flex>
        <v-flex xs3>
          <alert-status-distribution></alert-status-distribution>
        </v-flex>
        <v-flex xs6 d-flex>
          <v-layout>
            <v-flex xs2>
              <system-status></system-status>
            </v-flex>
            <v-flex xs2>
              <storage-status></storage-status>
            </v-flex>
            <v-flex xs2>
              <online-device></online-device>
            </v-flex>
            <v-flex xs2>
              <online-user></online-user>
            </v-flex>
          </v-layout>
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

// alert chart
import alertTypeDistribution from "../chart/alert/AlertTypeDistribution";
import alertStatusDistribution from "../chart/alert/AlertStatusDistribution";
import alertSourceRank from "../chart/alert/AlertSourceRank";

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

export default {
  components: {
    alertCompany,
    alertCount,
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
    postList
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
        id: 0,
        name: "静安区"
      });
      for (let i = 0; i < this.stationList.length; i++) {
        if (this.stationList[i].id != 14) {
          this.stationListShow.push(this.stationList[i]);
        }
      }
      console.log(this.stationListShow);
    }
  },
  computed: {
    ...mapGetters({
      stationList: "organization/stationList"
    })
  },
  mounted() {
    this.getStationList();
  }
};
</script>

<style>
</style>
