<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer fixed app v-model="drawer" clipped>
      <v-list>
        <v-list>
          <template v-for="(item, i) in menuManage">
            <v-layout v-if="item.heading" :key="i" row align-center>
              <v-subheader v-if="item.heading && userInfo.role<item.role">{{ item.heading }}</v-subheader>
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
          <template v-for="(item, i) in menuCommon">
            <v-layout v-if="item.heading" :key="i" row align-center>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-layout>
            <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model">
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-action v-if="item.icon">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
              <v-list-tile v-for="(child, i) in item.children" :key="i" :to="child.route">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
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
      <v-toolbar-title
        class="ml-2 font-weight-bold"
        style="width:232px; font-size:20px !important"
      >SkyHawk</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click.stop="searchDrawer=true;$refs.searchView.focus()">
        <v-icon>search</v-icon>
      </v-btn>

      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-avatar color="primary" size="32px">{{getFirstLetter(userInfo.name)}}</v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in menuUser" :key="index" :to="item.route">
            <v-list-tile-avatar>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-navigation-drawer width="500" right v-model="searchDrawer" absolute clipped temporary>
      <v-toolbar class="transparent" flat>
        <v-toolbar-title>搜索</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon small @click="searchDrawer=false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <search-view ref="searchView"></search-view>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import getFirstLetter from "../utils/FirstLetter";
import { mapGetters } from "vuex";
import companyService from "../service/CompanyService";
import searchView from "../components/drawer/Search";
export default {
  components: { searchView: searchView },
  data() {
    return {
      mini: false,
      value2: false,
      userHelp: false,
      drawer: true,
      searchDrawer: false,
      menuUser: [
        {
          icon: "exit_to_app",
          text: "注销",
          route: "/"
        }
      ],
      menuManage: [
        { heading: "管理", role: "0" },
        {
          icon: "business",
          text: "企业管理",
          route: "/admin/company",
          role: "0"
        },
        {
          icon: "people",
          text: "组织管理",
          route: "/admin/organization",
          role: "0"
        },
        {
          icon: "public",
          text: "公告板",
          role: "1",
          route: "/billboard"
        }
      ],
      menuCommon: [
        { heading: "通用", role: 4 },
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
          role: 3,
          children: [
            {
              icon: "list",
              text: "企业列表",
              route: "/company"
            },
            {
              icon: "report_problem",
              text: "黑名单"
            }
          ]
        },
        { heading: "数据监测", role: 2 },
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
        },
        { heading: "其他", role: 4 },
        {
          icon: "help_outline",
          text: "用户手册",
          role: 4
        },
        {
          icon: "language",
          text: "关于 SkyHawk",
          role: 4
        }
      ]
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
  async mounted() {}
};
</script>

<style scoped>
</style>
