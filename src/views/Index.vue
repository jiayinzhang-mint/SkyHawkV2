<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer fixed app v-model="drawer" clipped>
      <v-list>
        <v-list v-if="userInfo.role==0">
          <template v-for="(item, i) in menuManage">
            <v-layout v-if="item.heading" :key="i" row align-center>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-layout>
            <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
            <v-list-tile v-else :key="i" :to="item.route" ripple>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-list>
          <template v-for="(item, i) in menuCommon">
            <v-layout v-if="item.heading" :key="i" row align-center>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-layout>
            <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
            <v-list-tile v-else-if="userInfo.role<=item.role" :key="i" :to="item.route" ripple>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-list>
          <template v-for="(item, i) in menuData">
            <v-layout v-if="item.heading" :key="i" row align-center>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-layout>
            <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
            <v-list-tile v-else-if="userInfo.role<=item.role" :key="i" :to="item.route" ripple>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar clipped-left flat app fixed color="grey darken-4">
      <v-btn icon @click="goBack" class="hidden-md-and-down">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-side-icon
        class="hidden-lg-and-up"
        style="margin-left:-10px"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="ml-2" style="width:232px">SkyHawk</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-avatar color="primary" size="32px">{{getFirstLetter(userInfo.name)}}</v-avatar>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import getFirstLetter from "../utils/FirstLetter";
import { mapGetters } from "vuex";
import companyService from "../service/CompanyService";
export default {
  data() {
    return {
      mini: false,
      value2: false,
      userHelp: false,
      drawer: true,
      menuManage: [
        { heading: "管理" },
        {
          icon: "business",
          text: "企业管理",
          route: "/manage/company"
        },
        {
          icon: "people",
          text: "组织管理",
          route: "/manage/organize"
        }
      ],
      menuCommon: [
        { heading: "通用" },
        {
          icon: "dashboard",
          text: "今日概览",
          role: 2,
          route: "/today"
        },
        {
          icon: "map",
          text: "地图视图",
          route: "/map",
          role: 3
        },
        {
          icon: "alarm",
          text: "告警流转",
          route: "/alert",
          role: 4
        },
        {
          icon: "people",
          text: "组织信息",
          route: "/organization",
          role: 2
        },
        {
          icon: "business",
          text: "企业信息",
          route: "/company",
          role: 3
        }
      ],
      menuData: [
        { heading: "数据监测" },
        {
          icon: "build",
          text: "设备状态",
          role: 2,
          route: "/dashboard/analysis"
        },
        {
          icon: "data_usage",
          text: "告警统计",
          role: 2,
          route: "/dashboard/analysis"
        },
        {
          icon: "trending_up",
          text: "告警预测",
          role: 2,
          route: "/dashboard/perdict"
        }
      ],
      feedBack: "",
      notificationCenter: false,
      settingCenter: false,
      alertListShow: [],
      userCenter: false
    };
  },
  methods: {
    getFirstLetter: getFirstLetter,
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  async mounted() {
    var data = await companyService.getCompanyList();
    console.log(data);
  }
};
</script>

<style scoped>
</style>
