<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-start>
        <div class="body-2 font-weight-bold mb-1">系统负载</div>
        <div>
          <span class="display-3 font-weight-bold">{{systemStatistic.cpuPercent}}</span>
          <strong>&nbsp;&nbsp;%</strong>
        </div>
      </v-layout>
    </v-card-title>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      systemStatistic: "device/systemStatistic"
    })
  },
  mounted() {}
};
</script>

<style>
</style>
