<template>
  <v-container>
    <v-card>
      <v-layout>
        <v-flex xs3>
          <v-navigation-drawer permanent class="sub-nav">
            <v-toolbar color="transparent" flat>
              <v-toolbar-title
                class="subtitle-1 font-weight-medium text-uppercase"
              >{{currentCompany.brand}}</v-toolbar-title>
            </v-toolbar>
            <v-list dense class="transparent">
              <template v-for="(item, i) in menuCompany">
                <v-layout v-if="item.heading" :key="i">
                  <v-subheader v-if="item.heading" class="grey--text mt-4">{{ item.heading }}</v-subheader>
                </v-layout>
                <v-list-item
                  v-else
                  :key="i"
                  :to="'/admin/company/'+currentCompany.id + '/' +item.route"
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
        <v-flex xs9 style="height:calc(100vh - 90px);overflow:auto;">
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
      { heading: "设备" },
      {
        text: "监控点",
        route: "monitor"
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
