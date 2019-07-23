<template>
  <div>
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-black">今日</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon @click="refresh">
            <v-icon>refresh</v-icon>
          </v-btn>
        </template>
        <span>刷新</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon>
            <v-icon>print</v-icon>
          </v-btn>
        </template>
        <span>打印</span>
      </v-tooltip>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-hover>
            <v-card
              style="width:100%"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
            >
              <weather></weather>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm4 d-flex>
          <v-hover>
            <v-card
              style="width:100%"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
            >
              <post-list></post-list>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm4 d-flex>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <unprocessed-alert></unprocessed-alert>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs12 sm6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <online-device></online-device>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs12 sm6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <online-user></online-user>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs12 sm6>
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                  <system-status></system-status>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-black">昨日</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <alert-count></alert-count>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <alert-company></alert-company>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <processed-alert></processed-alert>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm3>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <wrong-alert></wrong-alert>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
    <v-toolbar class="transparent" flat>
      <v-toolbar-title class="headline font-weight-black">近期</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <alert-type-distribution></alert-type-distribution>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm4>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <alert-status-distribution></alert-status-distribution>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12 sm4>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
              <alert-source-rank></alert-source-rank>
            </v-card>
          </v-hover>
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
      dashboardShortcut.getOrganizationCalculateData(
        1,
        10,
        this.userInfo.station
      );
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
