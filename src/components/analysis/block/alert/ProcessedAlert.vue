<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout v-if="!dashboard" column align-start>
        <div class="body-2 font-weight-bold mb-1">处理率</div>
        <div>
          <span class="display-3 font-weight-bold">60</span>
          <strong>&nbsp;&nbsp;%</strong>
        </div>
      </v-layout>
      <v-layout v-else column align-center>
        <div class="body-2 font-weight-bold mb-1">处理率</div>
        <div>
          <span class="display-3 font-weight-light">60</span>
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
        :value="heartbeats"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    dashboard: Boolean
  },
  data() {
    return {
      heartbeats: [5, 9, 5, 9, 5, 10, 8, 4, 6, 2]
    };
  }
};
</script>

<style>
</style>

