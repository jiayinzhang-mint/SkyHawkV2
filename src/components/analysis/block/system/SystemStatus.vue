<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title>
        <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
        <v-layout column align-start>
          <div class="body-2 font-weigth-bold mb-1">系统负载</div>
          <div>
            <span class="display-3 font-weight-bold">{{deviceStatistic.onlineRate}}</span>
            <strong>&nbsp;&nbsp;%</strong>
          </div>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-hover>
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
      deviceStatistic: "device/deviceStatistic"
    })
  },
  mounted() {}
};
</script>

<style>
</style>
