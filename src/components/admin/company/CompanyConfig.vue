<template>
  <v-container>
    <v-card>
      <v-layout row>
        <v-flex xs3>
          <v-toolbar color="transparent" flat>
            <v-toolbar-title
              class="subheading font-weight-medium text-uppercase"
              style="margin-left:-7px"
            >{{currentCompany.brand}}</v-toolbar-title>
          </v-toolbar>
          <v-list class="transparent">
            <template v-for="(item, i) in menuCompany">
              <v-layout v-if="item.heading" :key="i" row align-center>
                <v-subheader v-if="item.heading" class="grey--text">{{ item.heading }}</v-subheader>
              </v-layout>
              <v-divider v-else-if="item.divider" :key="i" dark class="my-2"></v-divider>
              <v-list-tile
                v-else
                :key="i"
                :to="'/admin/company/'+currentCompany.id + '/' +item.route"
                ripple
              >
                <v-list-tile-content>
                  <v-list-tile-title class="body-2">{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
        <v-flex xs9 style="height:calc(100vh - 95px);overflow :auto;background:#3a3a3a">
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    currentCompany: [],
    menuCompany: [
      { heading: "通用" },
      {
        text: "基本信息",
        route: "info"
      },
      {
        text: "监管人员",
        route: "supervisor"
      },
      {
        text: "企业用户",
        route: "user"
      },
      {
        divider: true
      },
      { heading: "设备" },
      {
        text: "监控点",
        route: "monitor"
      },
      {
        divider: true
      },
      { heading: "其他" },
      {
        text: "设置",
        route: "setting"
      }
    ]
  }),
  methods: {
    getCurrentCompany() {
      this.currentCompany = this.companyList.find(element => {
        return element.id == this.$route.params.companyId;
      });
    }
  },
  mounted() {
    this.getCurrentCompany();
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      companyList: "company/companyList"
    })
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getCurrentCompany();
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
</style>
