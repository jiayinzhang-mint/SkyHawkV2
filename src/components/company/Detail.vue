<template>
  <v-container fluid>
    <v-card>
      <v-layout>
        <v-flex xs3>
          <v-navigation-drawer permanent class="sub-nav">
            <v-toolbar color="transparent" flat>
              <v-btn icon @click="goBack">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <v-toolbar-title
                class="subtitle-1 font-weight-black text-uppercase"
                style="margin-left:-20px"
              >{{currentCompany.brand}}</v-toolbar-title>
            </v-toolbar>
            <v-list dense class="transparent">
              <template v-for="(item, i) in menuCompany">
                <v-layout v-if="item.heading" :key="i">
                  <v-subheader v-if="item.heading" class="grey--text mt-5">{{ item.heading }}</v-subheader>
                </v-layout>
                <v-list-item
                  v-else
                  :key="i"
                  :to="'/company/'+currentCompany.id + '/' +item.route"
                  ripple
                >
                  <v-list-item-content>
                    <v-list-item-title class="body-2">{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <v-flex xs9 style="height:calc(100vh - 90px);overflow :auto">
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
        text: "告警历史",
        route: "alert"
      },
      {
        text: "每日晨检",
        route: "dailychecklist"
      },
      { heading: "数据监测" },
      {
        text: "历史评分",
        route: "score"
      },
      {
        text: "设备状态",
        route: "device"
      },
      {
        text: "定时抓拍",
        route: "gallery"
      },
      {
        text: "温湿度监测",
        route: "humiture"
      }
    ]
  }),
  methods: {
    getCurrentCompany() {
      this.currentCompany = this.companyList.find(element => {
        return element.id == this.$route.params.companyId;
      });
    },
    goBack() {
      this.$router.push({ path: "/company" });
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
