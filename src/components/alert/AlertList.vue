<template>
  <v-layout row>
    <v-flex xs12 sm3>
      <v-toolbar flat color="grey darken-3">
        <v-scroll-x-transition>
          <v-toolbar-title style="font-size:17px" v-if="!filted">告警流转</v-toolbar-title>
        </v-scroll-x-transition>
        <v-spacer></v-spacer>
        <v-scroll-x-transition>
          <v-chip v-if="filted && userInfo.role<=1" close @input="reFill">{{selectedStation.name}}</v-chip>
        </v-scroll-x-transition>
        <v-toolbar-items>
          <v-menu bottom left v-if="userInfo.role <=1">
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

        <v-btn icon @click="refreshAlertList">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>

      <v-list style="height:calc(100vh - 129px);overflow :auto" two-line>
        <v-scroll-x-transition group>
          <template v-for="(item,index) in alertListShow">
            <div :key="index">
              <v-list-tile avatar :to=" '/alert/' +item.id" ripple active-class="grey darken-2">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-icon
                      color="red"
                      style="font-size:16px;margin-bottom:2px"
                      class="mr-1"
                      v-if="item.state==1 && item.uncertain!=1"
                    >lens</v-icon>
                    <span class="font-weight-bold text-uppercase">{{item.brand.brand}}</span>
                  </v-list-tile-title>
                  <v-list-tile-sub-title class="font-weight-medium body-2">{{item.title}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{item.create_time | moment("YYYY-MM-DD HH:mm")}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-chip
                    color="primary darken-1"
                    text-color="white"
                    small
                    v-if="item.uncertain==1"
                  >转发</v-chip>
                  <v-chip color="red lighten-1" text-color="white" small v-if="item.state==9">误报</v-chip>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </template>
        </v-scroll-x-transition>
        <v-list-tile>
          <v-layout justify-center>
            <v-btn block class="text-xs-center" depressed round dark @click="getMoreAlert">加载更多</v-btn>
          </v-layout>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs9>
      <router-view v-if="this.$route.params.id"></router-view>
      <v-container v-else fluid fill-height>
        <v-layout align-center justify-center>
          <div class="headline font-weight-light">请选择告警</div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import alertService from "../../service/AlertService";
export default {
  data: () => ({
    alertListShow: [],
    page: 1,
    filted: false,
    selectedStation: [],
    loadAlert: false
  }),
  methods: {
    async refreshAlertList() {
      this.$loading.show(true);
      await alertService.restoreAlertList();
      this.$loading.show(false);
    },
    filter(id) {
      this.filted = true;
      this.selectedStation = this.stationList.find(element => {
        return element.id === id;
      });
      // console.log(this.selectedStation.id);
      this.alertListShow = [];
      this.alertList.forEach(element => {
        if (element.brand.station == id && element.state != 9) {
          this.alertListShow.push(element);
        }
      });
      // console.log(this.alertListShow);
    },
    updateAlertList() {
      if (!this.filted) {
        this.alertListShow = this.alertList;
      } else {
        this.alertListShow = [];

        this.alertList.forEach(element => {
          if (
            element.brand.station == this.selectedStation.id &&
            element.state != 9
          ) {
            this.alertListShow.push(element);
          }
        });
      }
    },
    reFill() {
      this.alertListShow = this.alertList;
      this.filted = false;
    },
    async getMoreAlert() {
      this.$loading.show(true);
      await alertService.updateAlertList();
      this.updateAlertList();
      if (this.userInfo.role <= 1 && this.filted) {
        this.selectedStation = this.selectedStation;
      } else if (this.userInfo.role >= 1 && this.userInfo.role <= 3) {
        this.selectedStation = this.stationList.find(element => {
          return element.id === this.userInfo.station;
        });
      }
      if (this.filted) {
        this.filter(this.selectedStation.id);
      }
      this.$loading.show(false);
    }
  },
  computed: {
    ...mapGetters({
      companyList: "company/companyList",
      alertList: "alert/alertList",
      stationList: "organization/stationList",
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    this.alertListShow = this.alertList;
  }
};
</script>

<style>
</style>
