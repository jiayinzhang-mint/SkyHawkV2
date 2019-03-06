<template>
  <div style="height:calc(100vh - 64px);overflow :auto">
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-bold">今日</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>print</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12 sm3>
          <unhandled-alert></unhandled-alert>
        </v-flex>
        <v-flex xs12 sm3>
          <online-device></online-device>
        </v-flex>
        <v-flex xs12 sm3>
          <online-user></online-user>
        </v-flex>
        <v-flex xs12 sm3>
          <system-status></system-status>
        </v-flex>
      </v-layout>
    </v-container>
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-bold">昨日</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12 sm3>
          <alert-count></alert-count>
        </v-flex>
        <v-flex xs12 sm3>
          <alert-company></alert-company>
        </v-flex>
        <v-flex xs12 sm3>
          <handled-alert></handled-alert>
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
      <v-layout>
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
// alert block
import alertCompany from "../../components/analysis/block/alert/AlertCompany";
import alertCount from "../../components/analysis/block/alert/AlertCount";
import handledAlert from "../../components/analysis/block/alert/HandledAlert";
import unhandledAlert from "../../components/analysis/block/alert/UnhandledAlert";
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
import dashboardShortcut from "../../shortcut/Dashboard";

export default {
  components: {
    alertCompany,
    alertCount,
    handledAlert,
    unhandledAlert,
    wrongAlert,
    onlineDevice,
    onlineUser,
    alertTypeDistribution,
    alertStatusDistribution,
    alertSourceRank,
    systemStatus
  },
  data() {
    return {};
  },
  methods: {
    refresh() {
      dashboardShortcut.getInstantData();
    }
  }
};
</script>

<style>
.v-card__title {
  padding: 15px;
}
</style>
