<template>
  <div >
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-bold">今日</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn icon @click="refresh" slot="activator">
          <v-icon>refresh</v-icon>
        </v-btn>
        <span>刷新</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon slot="activator">
          <v-icon>print</v-icon>
        </v-btn>
        <span>打印</span>
      </v-tooltip>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm4 d-flex>
          <weather></weather>
        </v-flex>
        <v-flex xs12 sm4 d-flex>
          <post-list></post-list>
        </v-flex>
        <v-flex xs12 sm4>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <unprocessed-alert></unprocessed-alert>
            </v-flex>
            <v-flex xs12 sm6>
              <online-device></online-device>
            </v-flex>
            <v-flex xs12 sm6>
              <online-user></online-user>
            </v-flex>
            <v-flex xs12 sm6>
              <system-status></system-status>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-bold">昨日</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm3>
          <alert-count></alert-count>
        </v-flex>
        <v-flex xs12 sm3>
          <alert-company></alert-company>
        </v-flex>
        <v-flex xs12 sm3>
          <processed-alert></processed-alert>
        </v-flex>
        <v-flex xs12 sm3>
          <wrong-alert></wrong-alert>
        </v-flex>
      </v-layout>
    </v-container>
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-bold">近期</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <alert-type-distribution></alert-type-distribution>
        </v-flex>
        <v-flex xs12 sm4>
          <alert-status-distribution></alert-status-distribution>
        </v-flex>
        <v-flex xs12 sm4>
          <alert-source-rank></alert-source-rank>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// alert block
import alertCompany from "../../components/analysis/block/alert/AlertCompany";
import alertCount from "../../components/analysis/block/alert/AlertCount";
import processedAlert from "../../components/analysis/block/alert/ProcessedAlert";
import unprocessedAlert from "../../components/analysis/block/alert/UnprocessedAlert";
import wrongAlert from "../../components/analysis/block/alert/WrongAlert";

// alert chart
import alertTypeDistribution from "../../components/analysis/chart/alert/AlertTypeDistribution";
import alertStatusDistribution from "../../components/analysis/chart/alert/AlertStatusDistribution";
import alertSourceRank from "../../components/analysis/chart/alert/AlertSourceRank";

// device block
import onlineDevice from "../../components/analysis/block/device/OnlineDevice";

// system block
import systemStatus from "../../components/analysis/block/system/SystemStatus";

// user block
import onlineUser from "../../components/analysis/block/user/OnlineUser";

// other block
import weather from "../../components/analysis/block/others/Weather";
import postList from "../../components/analysis/block/billboard/PostList";

import dashboardShortcut from "../../shortcut/Dashboard";

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
    weather,
    postList
  },
  data() {
    return {};
  },
  methods: {
    async refresh() {
      dashboardShortcut.getInstantData();
      dashboardShortcut.getRecentData();
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    dashboardShortcut.getInstantData();
  }
};
</script>

<style>
.v-card__title {
  padding: 15px;
}
</style>
