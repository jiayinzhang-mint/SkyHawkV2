<template>
  <v-layout>
    <v-flex xs12 class="grey-back">
      <v-toolbar color="grey darken-3" flat>
        <v-toolbar-title class="subtitle-1 font-weight-black">企业列表</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-toolbar flat color="transparent">
        <v-layout>
          <v-select
            v-if="userInfo.role<=1"
            :items="stationList"
            v-model="selectedStation"
            item-text="name"
            return-object
            dense
            label="请选择街道"
          ></v-select>
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-on="on" icon @click="selectedStation={}">
                <v-icon>clear</v-icon>
              </v-btn>
            </template>
            <span>清除筛选</span>
          </v-tooltip>
        </v-layout>
      </v-toolbar>
      <v-divider></v-divider>
      <v-simple-table style="height:calc(100vh - 129px - 64px);overflow :auto">
        <tbody>
          <tr
            class="clickable-tr"
            v-for="(item,i) in companyListShow"
            :key="`company-${i}`"
            ripple
            @click="showCompanyDetail(item.id)"
          >
            <td class="text-uppercase" style="width:350px">{{item.brand}}</td>
            <td class="text-uppercase" style="max-width:350px">{{item.name}}</td>
            <td>
              <v-rating dense small v-model="rating" readonly></v-rating>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    companyListShow: [],
    filted: false,
    selectedStation: {},
    rating: 5,
    pagination: {
      rowsPerPage: 25
    }
  }),
  methods: {
    filter() {
      this.companyListShow = [];
      if (this.selectedStation.id) {
        this.companyList.forEach(element => {
          if (element.station == this.selectedStation.id) {
            this.companyListShow.push(element);
          }
        });
      } else {
        this.companyListShow = this.companyList;
      }
    },
    showCompanyDetail(id) {
      this.$router.push({ path: "/company/" + id + "/info" });
    }
  },
  watch: {
    selectedStation: "filter"
  },
  computed: {
    ...mapGetters({
      companyList: "company/companyList",
      stationList: "organization/stationList",
      userInfo: "user/userInfo"
    }),
    pages() {
      var totalItems = this.companyListShow.length;
      this.totalPages = Math.ceil(totalItems / this.pagination.rowsPerPage);
      return this.totalPages;
    }
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
.clickable-tr {
  cursor: pointer;
}
td {
  font-size: 14px !important;
}
</style>