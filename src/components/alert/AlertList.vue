<template>
  <v-layout row>
    <v-flex xs12 class="grey-back">
      <v-toolbar flat color="transparent">
        <v-scroll-x-transition>
          <v-toolbar-title style="font-size:17px" v-if="!filted">告警流转</v-toolbar-title>
        </v-scroll-x-transition>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="changeableAlertPageFront"
          :total-visible="7"
          :length="pages"
          @input="changeAlertPage"
        ></v-pagination>
        <v-scroll-x-transition>
          <v-chip v-if="filted && userInfo.role<=1" close @input="reFill">{{selectedStation.name}}</v-chip>
        </v-scroll-x-transition>
        <v-tooltip bottom>
          <v-btn slot="activator" icon @click="refreshAlertList">
            <v-icon>refresh</v-icon>
          </v-btn>
          <span>刷新</span>
        </v-tooltip>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        hide-headers
        hide-actions
        :items="alertListShow"
        :pagination.sync="pagination"
        item-key="name"
        style="height:calc(100vh - 129px);overflow :auto"
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
                color="primary darken-1"
                text-color="white"
                small
                v-if="props.item.uncertain==1"
              >转发</v-chip>
              <v-chip color="red lighten-1" text-color="white" small v-if="props.item.state==9">误报</v-chip>
              <v-tooltip bottom>
                <v-btn icon slot="activator">
                  <v-icon>flag</v-icon>
                </v-btn>
                <span>标记</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn icon slot="activator">
                  <v-icon>redo</v-icon>
                </v-btn>
                <span>下发</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn icon slot="activator">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>删除</span>
              </v-tooltip>
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
    selectedStation: [],
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
      this.updateAlertList();
      console.log(this.alertListShow.length);
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
    showAlertDetail(id) {
      this.$router.push({ path: "/alert/" + id });
    },
    reFill() {
      this.alertListShow = this.alertList;
      this.filted = false;
    },
    async getMoreAlert() {
      const rsp = await alertService.updateAlertList();
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
      return rsp;
    },
    async changeAlertPage(e) {
      alertService.updateAlertPageFront(e);
      console.log(e);
      this.pagination.page = this.changeableAlertPageFront;
      if (e == this.totalPages && !this.noMore) {
        const rsp = await this.getMoreAlert();
        if (rsp.msg == "nomore") {
          this.noMore = true;
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      companyList: "company/companyList",
      alertList: "alert/alertList",
      alertPageFront: "alert/alertPageFront",
      stationList: "organization/stationList",
      userInfo: "user/userInfo"
    }),
    pages() {
      var totalItems = this.alertListShow.length;
      this.totalPages = Math.ceil(totalItems / this.pagination.rowsPerPage);
      return this.totalPages;
    }
  },
  mounted() {
    this.alertListShow = this.alertList;
    setTimeout(() => {
      this.pagination.page = this.alertPageFront;
      console.log(this.pagination.page);
      this.changeableAlertPageFront = this.alertPageFront;
    }, 10);
  }
};
</script>

<style>
.clickable-tr {
  cursor: pointer;
}
td {
  font-size: 14px !important;
}
</style>
