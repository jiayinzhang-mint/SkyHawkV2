<template>
  <div>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import alertStatistic from "../../../../utils/AlertStatistic";

export default {
  data() {
    return {
      wrongAlertRate: 0,
      wrongAlertArr: []
    };
  },
  methods: {},
  computed: {
    ...mapGetters({
      organizationStatistic: "organization/organizationStatistic"
    })
  },
  mounted() {
    this.wrongAlertRate = alertStatistic.getAlertRate(
      this.organizationStatistic[0],
      2
    );
    this.wrongAlertArr = alertStatistic.getAlertTrend(
      this.organizationStatistic,
      2
    );
  }
};
</script>

<style>
</style>
