<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-list dense shaped>
        <template v-for="(item, i) in menuManage">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-subheader v-if="item.heading && userInfo.role<item.role">{{ item.heading }}</v-subheader>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-item v-else-if="userInfo.role<=item.role" :key="i" :to="item.route" ripple>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="body-2">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-list dense shaped>
        <template v-for="(item, i) in menuCommon">
          <v-layout v-if="item.heading" :key="i">
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-layout>
          <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model">
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-action v-if="item.icon">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.route">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-item v-else-if="userInfo.role<=item.role" :key="i" :to="item.route" ripple>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="body-2">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left flat app fixed color="grey darken-4">
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

      <v-btn icon @click="userSetting=true">
        <v-icon>settings</v-icon>
      </v-btn>

      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-avatar color="primary" size="32px">{{getFirstLetter(userInfo.name)}}</v-avatar>
        </v-btn>
        <v-list>
          <v-list-item v-for="(item, index) in menuUser" :key="index" :to="item.route">
            <v-list-item-avatar>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

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

    <v-dialog v-model="userSetting" persistent width="500">
      <v-card>
        <v-toolbar class="transparent" flat>
          <v-toolbar-title>用户设置</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="userSetting=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <h4 class="mb-2 grey--text">修改密码</h4>
          <v-divider></v-divider>
          <v-form ref="changePasswordForm">
            <v-text-field class="mt-2" type="password" label="当前密码"></v-text-field>
            <v-text-field class="mt-2" type="password" label="新密码"></v-text-field>
          </v-form>
          <v-btn class="mt-3" @click="changePassword" rounded block depressed>确认</v-btn>
        </v-container>
      </v-card>
    </v-dialog>

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
      userSetting: false,
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
          role: 0
        },
        {
          icon: "people",
          text: "组织管理",
          route: "/admin/organization",
          role: 0
        },
        {
          icon: "public",
          text: "公告板",
          role: 4,
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
          role: 3,
          text: "企业列表",
          route: "/company"
        },
        { heading: "数据监测", role: 2 },
        {
          icon: "data_usage",
          text: "数据统计",
          role: 2,
          route: "/dashboard/analysis"
        },
        {
          icon: "trending_up",
          text: "数据地图",
          role: 2,
          route: "/dashboard/map"
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
    },
    changePassword() {}
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  async mounted() {}
};
</script>

