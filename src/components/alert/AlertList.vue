<template>
  <v-layout>
    <v-flex xs12 class="grey-back">
      <v-toolbar flat color="transparent">
        <v-scroll-x-transition>
          <v-toolbar-title class="subtitle-1 font-weight-black">告警流转</v-toolbar-title>
        </v-scroll-x-transition>

        <v-spacer></v-spacer>
        <v-toolbar-title class="body-2 mr-3">{{alertRange}}</v-toolbar-title>
        <v-btn :disabled="alertPage==1" icon @click="changeAlertPage(-1)">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn :disabled="noMore" icon @click="changeAlertPage(1)">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>

        <v-tooltip bottom>
          <v-btn v-slot:activator="on" icon @click="refreshAlertList">
            <v-icon v-on="on">refresh</v-icon>
          </v-btn>
          <span>刷新</span>
        </v-tooltip>
      </v-toolbar>
      <v-toolbar flat class="transparent">
        <v-layout>
          <v-select
            v-model="filter.selectedStation"
            :items="stationList"
            item-text="name"
            dense
            hide-details
            single-line
            label="请选择街道"
            return-object
          ></v-select>
          <v-select
            v-model="filter.selectedType"
            class="ml-2"
            :items="alertTypeArr"
            item-text="name"
            dense
            single-line
            hide-details
            label="请选择类型"
            return-object
          ></v-select>
          <v-select
            v-model="filter.selectedType"
            class="ml-2"
            :items="alertTypeArr"
            item-text="name"
            dense
            single-line
            hide-details
            label="请选择状态"
            return-object
          ></v-select>

          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-on="on" class="ml-2" icon @click="reFill">
                <v-icon>clear</v-icon>
              </v-btn>
            </template>
            <span>清除筛选</span>
          </v-tooltip>
        </v-layout>
      </v-toolbar>
      <v-divider></v-divider>
      <v-simple-table no-data-text="暂无数据" style="height:calc(100vh - 129px - 64px);overflow :auto">
        <tbody>
          <tr class="clickable-tr" ripple v-for="(item,i) in alertListShow" :key="`alert-${i}`">
            <td class="text-xs-left" @click="showAlertDetail(item.id)">
              <v-icon
                color="red"
                class="mr-1"
                style="font-size:12px;margin-bottom:4px"
                v-if="item.state==1 && item.uncertain!=1"
              >lens</v-icon>
              {{ item.brand.brand }}
            </td>
            <td class="text-xs-left" @click="showAlertDetail(item.id)">{{ item.title }}</td>
            <td
              class="text-xs-left"
              @click="showAlertDetail(item.id)"
            >{{ item.create_time | timeFormat }}</td>
            <td class="text-xs-left">
              <v-chip color="orange darken-2" text-color="white" small v-if="item.uncertain==1">标记</v-chip>
              <v-chip color="red darken-1" text-color="white" small v-else-if="item.state==1">待处理</v-chip>
              <v-chip
                color="primary darken-1"
                text-color="white"
                small
                v-else-if="item.state==2"
              >整改中</v-chip>
              <v-chip color="green darken-1" text-color="white" small v-else-if="item.state==4">已完成</v-chip>
              <v-chip color="grey darken-1" text-color="white" small v-else-if="item.state==9">误报</v-chip>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import alertService from "../../service/AlertService";
import { setTimeout } from "timers";
export default {
  data: () => ({
    alertListShow: [],
    filted: false,
    filter: {
      selectedStation: {},
      selectedType: {}
    },

    loadAlert: false,
    pagination: {
      rowsPerPage: 25
    },
    totalPages: 0,
    changeableAlertPageFront: 1,
    noMore: false
  }),
  methods: {
    async refreshAlertList() {
      await alertService.restoreAlertList();
      await alertService.getALertList(this.userInfo.station);
      this.updateAlertList();
    },
    async filtAlertList() {
      this.filted = true;
      await alertService.getALertList(
        this.filter.selectedStation.id,
        this.filter.selectedType.type
      );
      this.updateAlertList();
    },
    updateAlertList() {
      this.alertListShow = this.alertList;
    },
    showAlertDetail(id) {
      this.$router.push({ path: "/alert/" + id });
    },
    reFill() {
      this.filter.selectedStation = {};
      this.filter.selectedType = {};
      this.alertListShow = this.alertList;
    },
    async getMoreAlert() {
      const rsp = await alertService.updateAlertList();
      this.updateAlertList();
      if (this.userInfo.role <= 1 && this.filted) {
        this.filter.selectedStation = this.filter.selectedStation;
      } else if (this.userInfo.role >= 1 && this.userInfo.role <= 3) {
        this.filter.selectedStation = this.filter.stationList.find(element => {
          return element.id === this.userInfo.station;
        });
      }
      if (this.filted || (this.userInfo.role > 1 && this.userInfo.role <= 3)) {
        this.filtAlertList(this.filter.selectedStation.id);
      }
      return rsp;
    },
    async changeAlertPage(e) {
      alertService.updateAlertPage(e);
      console.log(e);
      const rsp = await this.getMoreAlert();
      if (rsp.msg == "nomore") {
        this.noMore = true;
      }
    }
  },
  watch: {
    filter: {
      handler() {
        this.filtAlertList();
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      companyList: "company/companyList",
      alertList: "alert/alertList",
      alertPage: "alert/alertPage",
      alertTypeArr: "alert/alertTypeArr",
      stationList: "organization/stationList",
      userInfo: "user/userInfo"
    }),
    pages() {
      var totalItems = this.alertListShow.length;
      this.totalPages = Math.ceil(totalItems / this.pagination.rowsPerPage);
      return this.totalPages;
    },
    alertRange() {
      var alertRange =
        "第 " +
        `${(this.alertPage - 1) * 50 + 1}` +
        "-" +
        `${this.alertPage * 50}` +
        " 行";
      return alertRange;
    }
  },
  mounted() {
    this.alertListShow = this.alertList;
  }
};
</script>

<style>
</style>
