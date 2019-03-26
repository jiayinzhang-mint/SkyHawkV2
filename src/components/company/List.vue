<template>
  <v-layout row>
    <v-flex xs12>
      <v-toolbar color="grey darken-3" flat>
        <v-toolbar-title style="font-size:17px">企业列表</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-scroll-x-transition>
          <v-chip v-if="filted && userInfo.role<=1" close @input="reFill">{{selectedStation.name}}</v-chip>
        </v-scroll-x-transition>
        <v-toolbar-items>
          <v-menu bottom left v-if="userInfo.role<=1">
            <v-btn slot="activator" icon>
              <v-icon>sort</v-icon>
            </v-btn>
            <v-list style="height:375px ;overflow :auto">
              <v-list-tile v-for="(item, i) in stationList" :key="i" @click="filter(item.id)">
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container grid-list-lg fluid style="height:calc(100vh - 129px);overflow :auto">
        <v-layout row wrap>
          <v-flex xs3 v-for="(item,index) in companyListShow" :key="index">
            <v-slide-y-transition>
              <v-card :to=" '/company/' +item.id+'/info'" ripple active-class="grey darken-2">
                <v-card-title class="text-uppercase font-weight-bold">
                  <div>{{item.brand | longText(10)}}</div>
                  <v-spacer></v-spacer>
                  <v-rating dense small v-model="rating"></v-rating>
                </v-card-title>
              </v-card>
            </v-slide-y-transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    companyListShow: [],
    filted: false,
    selectedStation: [],
    rating: 5
  }),
  methods: {
    filter(id) {
      this.filted = true;
      this.selectedStation = this.stationList.find(element => {
        return element.id === id;
      });
      this.companyListShow = [];
      this.companyList.forEach(element => {
        if (element.station == id) {
          this.companyListShow.push(element);
        }
      });
    },
    reFill() {
      this.companyListShow = this.companyList;
      this.filted = false;
    }
  },
  computed: {
    ...mapGetters({
      companyList: "company/companyList",
      stationList: "organization/stationList",
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    this.companyListShow = this.companyList;
    if (this.userInfo.role > 1) {
      this.filter(this.userInfo.station);
    }
    console.log(this.$route.fullPath.split("/")[1]);
  },
  beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style>
</style>
