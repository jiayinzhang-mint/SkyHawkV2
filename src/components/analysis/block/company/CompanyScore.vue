<template>
  <v-hover>
    <v-card color="grey darken-2" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="subheading font-weight-bold mb-1">评分趋势</div>
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
      heartbeats: [5, 9, 5, 9, 5, 10, 8, 4, 6, 2]
    };
  }
};
</script>

<style>
</style>

