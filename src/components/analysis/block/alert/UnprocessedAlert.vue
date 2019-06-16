<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-start v-if="!dashboard">
        <div class="body-2 font-weight-bold mb-1">待处理告警</div>
        <div>
          <span class="display-3 font-weight-bold">{{alertStatistic.unprocessedAlertCount}}</span>
          <strong>&nbsp;&nbsp;次</strong>
        </div>
      </v-layout>
      <v-layout column align-center v-else>
        <div class="body-2 font-weight-bold mb-1 neon">待处理告警</div>
        <div>
          <span class="display-3 font-weight-light neon">{{alertStatistic.unprocessedAlertCount}}</span>
          <strong class="neon">&nbsp;&nbsp;次</strong>
        </div>
      </v-layout>
    </v-card-title>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    dashboard: Boolean
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      alertStatistic: "alert/alertStatistic"
    })
  },
  mounted() {}
};
</script>

<style>
</style>
