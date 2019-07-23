<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout v-if="!dashboard" column align-start>
        <div class="body-2 font-weight-bold mb-1">告警数</div>
        <div>
          <span class="display-3 font-weight-bold">{{alertCount}}</span>
          <strong>&nbsp;&nbsp;次</strong>
        </div>
      </v-layout>
      <v-layout v-else column align-center>
        <div class="body-2 font-weight-bold mb-1">告警数</div>
        <div>
          <span class="display-3 font-weight-light">{{alertCount}}</span>
          <strong class>&nbsp;&nbsp;次</strong>
        </div>
      </v-layout>
    </v-card-title>
    <v-sheet v-if="!dashboard" color="transparent">
      <v-sparkline
        :smooth="16"
        :line-width="3"
        padding="15"
        color="white"
        :value="alertCountTrendArr"
        auto-draw
        stroke-linecap="rounded"
      ></v-sparkline>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import alert from "../../../../store/modules/alert";
import alertStatistic from "../../../../utils/AlertStatistic";

export default {
  props: {
    dashboard: Boolean
  },
  data() {
    return {
      alertCount: 0,
      alertCountTrendArr: []
    };
  },
  methods: {},
  computed: {
    ...mapGetters({
      organizationStatistic: "organization/organizationStatistic"
    })
  },
  mounted() {
    if (!this.dashboard) {
      this.alertCount = alertStatistic.getAlertCount(
        this.organizationStatistic[0]
      );
      this.alertCountTrendArr = alertStatistic.getAlertTrend(
        this.organizationStatistic
      );
    }
  }
};
</script>

<style>
</style>
