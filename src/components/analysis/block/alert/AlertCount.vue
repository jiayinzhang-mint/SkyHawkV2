<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="body-2 font-weigth-bold mb-1">告警数</div>
          <div>
            <span class="display-3 font-weight-bold">{{alertCount}}</span>
            <strong>&nbsp;&nbsp;次</strong>
          </div>
        </v-layout>
      </v-card-title>
      <v-sheet color="transparent">
        <v-sparkline
          :smooth="16"
          :line-width="3"
          padding="15"
          color="white"
          :value="alertCountTrendArr"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>
      </v-sheet>
    </v-card>
  </v-hover>
</template>

<script>
import { mapGetters } from "vuex";
import alert from "../../../../store/modules/alert";

export default {
  data() {
    return {
      alertCount: 0,
      alertCountTrendArr: []
    };
  },
  methods: {
    getAlertCount(e) {
      var alertCount = 0;
      // alert type won't include err & unprocessed alert
      var alertTypeArr = JSON.parse(e.alertType);
      for (let i = 0; i < alertTypeArr.length; i++) {
        alertCount += alertTypeArr[i];
      }
      return alertCount;
    },
    getAlertCountTrend() {
      // unshift: add element to head ----- push: to end
      for (let i = 0; i < this.organizationStatistic.length; i++) {
        this.alertCountTrendArr.unshift(
          this.getAlertCount(this.organizationStatistic[i])
        );
      }
      console.log(this.alertCountTrendArr);
    }
  },
  computed: {
    ...mapGetters({
      organizationStatistic: "organization/organizationStatistic"
    })
  },
  mounted() {
    this.alertCount = this.getAlertCount(this.organizationStatistic[0]);
    this.getAlertCountTrend();
  }
};
</script>

<style>
</style>
