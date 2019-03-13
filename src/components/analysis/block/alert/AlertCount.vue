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
import alertStatistic from "../../../../utils/AlertStatistic";

export default {
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
    this.alertCount = alertStatistic.getAlertCount(
      this.organizationStatistic[0]
    );
    this.alertCountTrendArr = alertStatistic.getAlertTrend(
      this.organizationStatistic
    );
  }
};
</script>

<style>
</style>
