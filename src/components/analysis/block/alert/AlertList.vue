<template>
  <div>
    <v-layout column align-center>
      <div class="body-2 font-weight-bold mb-1">近期告警</div>
    </v-layout>
    <v-list dense style="max-height:500px;overflow:auto">
      <div v-for="(item,i) in alertList" :key="i">
        <v-list-tile>
          <v-list-tile-title class="body-2">{{item.title}}</v-list-tile-title>
          <v-list-tile-sub-title>{{item.brand.brand}}</v-list-tile-sub-title>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      alertList: "alert/alertList"
    })
  }
};
</script>

<style scoped>
.theme--dark.v-list {
  background: transparent;
}
</style>
