<template>
  <div>
    <v-card-title>
      <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
      <v-layout column align-start>
        <div class="body-2 font-weigth-bold mb-1">涉及企业</div>
        <div>
          <span class="display-3 font-weight-bold">98</span>
          <strong>&nbsp;&nbsp;家</strong>
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
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heartbeats: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
    };
  }
};
</script>

<style>
</style>
