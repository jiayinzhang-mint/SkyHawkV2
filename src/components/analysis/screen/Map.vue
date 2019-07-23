<template>
  <v-app dark class="dashboard">
    <v-toolbar dark flat tabs class="transparent">
      <v-toolbar-title class="ml-2 font-weight-bold" style="font-size:20px !important">SkyHawk</v-toolbar-title>
      <v-toolbar-title class="title-des ml-2">数据地图</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="getInstantData()">
        <v-icon>refresh</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-model="model" left slider-color="primary" show-arrows>
          <v-tab
            @click="alterTab(item)"
            v-for="(item,i) in stationListShow"
            :key="i"
            :href="`#tab-${i}`"
            class
          >{{item.name}}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-divider></v-divider>

    <v-tabs-items v-model="model">
      <v-tab-item v-for="(item,i) in stationListShow" :key="i" :value="`tab-${i}`">
        <v-card flat></v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-container fluid grid-list-md>
      <v-layout row wrap fill-height></v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      model: "tab-0",
      stationListShow: []
    };
  },
  methods: {
    getStationList() {
      this.stationListShow.push({
        id: 1,
        name: "静安区"
      });
      for (let i = 0; i < this.stationList.length; i++) {
        if (this.stationList[i].id != 14) {
          this.stationListShow.push(this.stationList[i]);
        }
      }
      console.log(this.stationListShow);
    },

    alterTab(item) {
      console.log(item);
      dashboardShortcut.getOrganizationCalculateData(1, 10, item.id);
    }
  },
  computed: {
    ...mapGetters({
      stationList: "organization/stationList",
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    this.getStationList();
  }
};
</script>

<style>
.wrapper {
  display: grid;
  grid-auto-rows: auto;
  justify-items: stretch;
  align-items: stretch;
  align-content: stretch;
  justify-content: stretch;
  height: 100%;
  box-sizing: border-box;
}

.wrapper-v {
  grid-template-columns: repeat(1, 1fr);
}
</style>
