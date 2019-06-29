<template>
  <v-layout row>
    <v-flex
      xs12
      class="grey-back"
    >
      <v-toolbar
        color="grey darken-3"
        flat
      >
        <v-toolbar-title style="font-size:17px">企业列表</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="pagination.page"
          :total-visible="7"
          :length="pages"
        ></v-pagination>
      </v-toolbar>
      <v-toolbar
        flat
        color="transparent"
      >
        <v-select
          v-if="userInfo.role<=1"
          :items="stationList"
          v-model="selectedStation"
          item-text="name"
          return-object
          solo-inverted
          label="请选择街道"
        ></v-select>
        <v-tooltip bottom>
          <span>清除筛选</span>
          <v-btn
            slot="activator"
            icon
            @click="selectedStation={}"
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-tooltip>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        hide-actions
        hide-headers
        :items="companyListShow"
        :pagination.sync="pagination"
        item-key="name"
        style="height:calc(100vh - 129px - 64px);overflow :auto"
      >
        <template v-slot:items="props">
          <tr
            class="clickable-tr"
            ripple
            @click="showCompanyDetail(props.item.id)"
          >
            <td
              class="text-uppercase"
              style="width:300px"
            >{{props.item.brand}}</td>
            <td
              class="text-uppercase"
              style="max-width:300px"
            >{{props.item.name}}</td>
            <td>
              <v-rating
                dense
                small
                v-model="rating"
                readonly
              ></v-rating>
            </td>
          </tr>
        </template>
      </v-data-table>
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