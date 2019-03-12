<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="body-2 font-weigth-bold mb-1">误报率</div>
          <div>
            <span class="display-3 font-weight-bold">{{wrongAlertRate}}</span>
            <strong>&nbsp;&nbsp;%</strong>
          </div>
        </v-layout>
      </v-card-title>
      <v-sheet color="transparent">
        <v-sparkline
          :smooth="16"
          :line-width="3"
          padding="15"
          color="white"
          :value="wrongAlertArr"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>
      </v-sheet>
    </v-card>
  </v-hover>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      wrongAlertRate: 0,
      wrongAlertArr: []
    };
  },
  methods: {
    getWrongAlertRate(e) {
      var wrongAlertCount = 0;
      var alertCount = 0;

      var alertStateArr = JSON.parse(e.alertState);
      wrongAlertCount = alertStateArr[2];

      var alertTypeArr = JSON.parse(e.alertType);
      for (let i = 0; i < alertTypeArr.length; i++) {
        alertCount += alertTypeArr[i];
      }
      return (wrongAlertCount / (alertCount + 1)).toFixed(2);
    },
    getWrongAlertTrend() {
      for (let i = 0; i < this.organizationStatistic.length; i++) {
        console.log(this.getWrongAlertRate(this.organizationStatistic[i]));
        // * 100 because vuetify only support int
        this.wrongAlertArr.unshift(
          100 * this.getWrongAlertRate(this.organizationStatistic[i])
        );
      }
      console.log(this.wrongAlertArr);
    }
  },
  computed: {
    ...mapGetters({
      organizationStatistic: "organization/organizationStatistic"
    })
  },
  mounted() {
    this.wrongAlertRate = this.getWrongAlertRate(this.organizationStatistic[0]);
    this.getWrongAlertTrend();
  }
};
</script>

<style>
</style>
