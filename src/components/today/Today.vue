<template>
  <div style="height:calc(100vh - 64px);overflow :auto">
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-bold">今日</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>print</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12 sm3>
          <unhandledalert></unhandledalert>
        </v-flex>
        <v-flex xs12 sm3>
          <onlinedevice></onlinedevice>
        </v-flex>
        <v-flex xs12 sm3>
          <onlineuser></onlineuser>
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
          <alertcount></alertcount>
        </v-flex>
        <v-flex xs12 sm3>
          <alertcompany></alertcompany>
        </v-flex>
        <v-flex xs12 sm3>
          <handledalert></handledalert>
        </v-flex>
        <v-flex xs12 sm3>
          <wrongalert></wrongalert>
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
          <alerttypedistribution></alerttypedistribution>
        </v-flex>
        <v-flex xs12 sm4>
          <alertstatusdistribution></alertstatusdistribution>
        </v-flex>
        <v-flex xs12 sm4>
          <alertsourcerank></alertsourcerank>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// alert block
import alertcompany from "../../components/analysis/block/alert/AlertCompany";
import alertcount from "../../components/analysis/block/alert/AlertCount";
import handledalert from "../../components/analysis/block/alert/HandledAlert";
import unhandledalert from "../../components/analysis/block/alert/UnhandledAlert";
import wrongalert from "../../components/analysis/block/alert/WrongAlert";

// alert chart
import alerttypedistribution from "../../components/analysis/chart/alert/AlertTypeDistribution";
import alertstatusdistribution from "../../components/analysis/chart/alert/AlertStatusDistribution";
import alertsourcerank from "../../components/analysis/chart/alert/AlertSourceRank";

// device block
import onlinedevice from "../../components/analysis/block/device/OnlineDevice";

// user block
import onlineuser from "../../components/analysis/block/user/OnlineUser";

export default {
  components: {
    alertcompany,
    alertcount,
    handledalert,
    unhandledalert,
    wrongalert,
    onlinedevice,
    onlineuser,
    alerttypedistribution,
    alertstatusdistribution,
    alertsourcerank
  },
  data() {
    return {};
  }
};
</script>

<style>
.v-card__title {
  padding: 15px;
}
</style>
