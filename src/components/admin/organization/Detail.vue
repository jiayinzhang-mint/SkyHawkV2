
<template>
  <v-container>
    <v-card>
      <v-layout>
        <v-flex xs3>
          <v-navigation-drawer permanent class="sub-nav">
            <v-list dense class="transparent">
              <template v-for="(item, i) in menuCompany">
                <v-layout v-if="item.heading" :key="i">
                  <v-subheader v-if="item.heading" class="grey--text mt-4">{{ item.heading }}</v-subheader>
                </v-layout>
                <v-list-item
                  v-else
                  :key="i"
                  :to="'/admin/organization/'+$route.params.organizationId + '/' +item.route"
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
        <v-flex xs9 style="height:calc(100vh - 90px); overflow :auto">
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
    currentOrganization: [],
    menuCompany: [
      { heading: "通用" },
      {
        text: "基本信息",
        route: "info"
      },
      {
        text: "组织用户",
        route: "user"
      },
      { heading: "其他" },
      {
        text: "设置",
        route: "setting"
      }
    ]
  }),
  methods: {},
  mounted() {},
  computed: {
    ...mapGetters({
      organizationList: "organization/organizationList"
    })
  },
  beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
</style>
