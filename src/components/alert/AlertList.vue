<template>
  <v-layout row>
    <v-flex xs12 class="grey-back">
      <v-toolbar flat color="transparent">
        <v-scroll-x-transition>
          <v-toolbar-title style="font-size:17px">告警流转</v-toolbar-title>
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
          <v-btn slot="activator" icon @click="refreshAlertList">
            <v-icon>refresh</v-icon>
          </v-btn>
          <span>刷新</span>
        </v-tooltip>
      </v-toolbar>
      <v-toolbar flat class="transparent">
        <v-layout row wrap>
          <v-select
            v-model="filter.selectedStation"
            :items="stationList"
            item-text="name"
            solo-inverted
            label="请选择街道"
            return-object
          ></v-select>
          <v-select
            v-model="filter.selectedType"
            class="ml-2"
            :items="alertTypeArr"
            item-text="name"
            solo-inverted
            label="请选择类型"
            return-object
          ></v-select>
          <v-select
            v-model="filter.selectedType"
            class="ml-2"
            :items="alertTypeArr"
            item-text="name"
            solo-inverted
            label="请选择状态"
            return-object
          ></v-select>

          <v-tooltip bottom>
            <v-btn slot="activator" icon @click="reFill">
              <v-icon>clear</v-icon>
            </v-btn>
            <span>清除筛选</span>
          </v-tooltip>
        </v-layout>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        hide-headers
        hide-actions
        :items="alertListShow"
        item-key="name"
        no-data-text="暂无数据"
        style="height:calc(100vh - 129px - 64px);overflow :auto"
      >
        <template v-slot:items="props">
          <tr class="clickable-tr" ripple>
            <td class="text-xs-left" @click="showAlertDetail(props.item.id)">
              <v-icon
                color="red"
                class="mr-1"
                style="font-size:12px;margin-bottom:4px"
                v-if="props.item.state==1 && props.item.uncertain!=1"
              >lens</v-icon>
              {{ props.item.brand.brand }}
            </td>
            <td class="text-xs-left" @click="showAlertDetail(props.item.id)">{{ props.item.title }}</td>
            <td
              class="text-xs-left"
              @click="showAlertDetail(props.item.id)"
            >{{ props.item.create_time | timeFormat }}</td>
            <td class="text-xs-left">
              <v-chip
                color="orange darken-2"
                text-color="white"
                small
                v-if="props.item.uncertain==1"
              >标记</v-chip>
              <v-chip
                color="red darken-1"
                text-color="white"
                small
                v-else-if="props.item.state==1"
              >待处理</v-chip>
              <v-chip
                color="primary darken-1"
                text-color="white"
                small
                v-else-if="props.item.state==2"
              >整改中</v-chip>
              <v-chip
                color="green darken-1"
                text-color="white"
                small
                v-else-if="props.item.state==4"
              >已完成</v-chip>
              <v-chip
                color="grey darken-1"
                text-color="white"
                small
                v-else-if="props.item.state==9"
              >误报</v-chip>
            </td>
          </tr>
        </template>
      </v-data-table>
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
