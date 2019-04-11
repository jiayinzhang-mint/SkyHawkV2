<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout v-if="!dashboard" column align-start>
        <div class="body-2 font-weight-bold mb-1">处理率</div>
        <div>
          <span class="display-3 font-weight-bold">{{processedAlert}}</span>
          <strong>&nbsp;&nbsp;%</strong>
        </div>
      </v-layout>
      <v-layout v-else column align-center>
        <div class="body-2 font-weight-bold mb-1">处理率</div>
        <div>
          <span class="display-3 font-weight-light">{{processedAlert}}</span>
          <strong>&nbsp;&nbsp;%</strong>
        </div>
      </v-layout>
    </v-card-title>
    <v-sheet v-if="!dashboard" color="transparent">
      <v-sparkline
        :smooth="16"
        :line-width="3"
        padding="15"
        color="white"
        :value="processedAlertArr"
        auto-draw
        stroke-linecap="round"
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
      processedAlert: 0,
      processedAlertArr: []
    };
  },
  computed: {
    ...mapGetters({
      organizationStatistic: "organization/organizationStatistic"
    })
  },
  mounted() {
    if (!this.dashboard) {
      this.processedAlert = alertStatistic.getAlertRate(
        this.organizationStatistic[0],
        3
      );
      this.processedAlertArr = alertStatistic.getAlertTrend(
        this.organizationStatistic,
        3
      );
    }
  }
};
</script>

<style>
</style>

