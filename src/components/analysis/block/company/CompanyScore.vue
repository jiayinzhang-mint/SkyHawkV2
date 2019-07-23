<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-start>
        <div class="subtitle-1 font-weight-bold mb-1">评分趋势</div>
        <div>
          <span class="display-3 font-weight-bold">4.7</span>
          <strong>&nbsp;&nbsp;/5</strong>
        </div>
      </v-layout>
    </v-card-title>
    <v-sheet color="transparent">
      <v-sparkline
        :smooth="16"
        :line-width="3"
        padding="15"
        color="white"
        :value="heartbeats"
        auto-draw
        stroke-linecap="rounded"
      ></v-sparkline>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heartbeats: [5, 9, 5, 9, 5, 10, 8, 4, 6, 2]
    };
  }
};
</script>

<style>
</style>

