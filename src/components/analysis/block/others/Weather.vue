<template>
  <v-container>
    <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
    <v-layout>
      <v-flex xs6>
        <div class="body-2 font-weight-black mb-1">{{weather.province}} {{weather.city}}</div>
        <div>
          <span class="display-3 font-weight-black">{{weather.temperature}}°</span>
          <strong class="font-weight-black">&nbsp;&nbsp;C</strong>
        </div>
        <div class="font-weight-black">{{date}}</div>
      </v-flex>
      <v-flex xs6>
        <v-container class="text-right">
          <v-icon class="weather" v-if="weather.weather=='晴'">wb_sunny</v-icon>
          <v-icon class="weather" v-else-if="weather.weather.indexOf('雨')!=-1">scatter_plot</v-icon>
          <v-icon class="weather" v-else-if="weather.weather.indexOf('雪')!=-1">ac_unit</v-icon>
          <v-icon class="weather" v-else>cloud</v-icon>
        </v-container>
      </v-flex>
    </v-layout>
    <v-divider class="mt-2"></v-divider>
    <v-layout class="text-center pt-3">
      <v-flex xs3>
        <small class="font-weight-black">天气</small>
        <div class="subtitle-1 mt-3">{{weather.weather}}</div>
      </v-flex>
      <v-flex xs3>
        <small class="font-weight-black">湿度</small>
        <div class="subtitle-1 mt-3">{{weather.humidity}} %</div>
      </v-flex>
      <v-flex xs3>
        <small class="font-weight-black">风向</small>
        <div class="subtitle-1 mt-3">{{weather.winddirection}}</div>
      </v-flex>
      <v-flex xs3>
        <small class="font-weight-black">风速</small>
        <div class="subtitle-1 mt-3">{{weather.windpower}} 级</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import search from "../../../../utils/Search";

export default {
  props: {
    viewType: String
  },
  data() {
    return {
      date: null
    };
  },
  methods: {},
  computed: {
    ...mapGetters({
      weather: "others/weather"
    })
  },
  mounted() {
    this.date = new Date();
    this.date = this.date.toLocaleDateString();
    console.log(this.viewType);
  }
};
</script>

<style>
</style>
