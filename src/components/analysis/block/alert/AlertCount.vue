<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="body-2 font-weigth-bold mb-1">告警数</div>
          <div>
            <span class="display-3 font-weight-bold">120</span>
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
          :value="heartbeats"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>
      </v-sheet>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      heartbeats: [30, 42, 95, 91, 53, 102, 32, 59, 101, 70]
    };
  }
};
</script>

<style>
</style>
