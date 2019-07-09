<template>
  <v-layout row>
    <v-flex sm3>
      <v-toolbar color="grey darken-3" flat>
        <v-scroll-x-transition>
          <v-toolbar-title v-if="!filted || userInfo.role>1 ">企业列表</v-toolbar-title>
        </v-scroll-x-transition>
        <v-spacer></v-spacer>
        <v-scroll-x-transition>
          <v-chip v-if="filted && userInfo.role<=1" close @input="reFill">{{selectedStation.name}}</v-chip>
        </v-scroll-x-transition>
        <v-toolbar-items>
          <v-menu bottom left v-if="userInfo.role<=1">
            <v-btn slot="activator" icon>
              <v-icon>sort</v-icon>
            </v-btn>
            <v-list style="height:375px ;overflow :auto">
              <v-list-item v-for="(item, i) in stationList" :key="i" @click="filter(item.id)">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list style="height:calc(100vh - 129px);overflow :auto">
        <v-scroll-x-transition group>
          <template v-for="(item,index) in companyListShow">
            <div :key="index">
              <v-list-item v-if="item.id==$route.params.companyId" ripple class="grey darken-2">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase" style="color:white" v-html="item.brand"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-else
                :to="'/admin/company/' +item.id+'/info'"
                ripple
                active-class="grey darken-2"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase" style="color:white" v-html="item.brand"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>
            </div>
          </template>
        </v-scroll-x-transition>
      </v-list>
    </v-flex>
    <v-flex sm9>
      <router-view ref="companyDetail" v-if="this.$route.params.companyId"></router-view>
      <v-container v-else fluid fill-height>
        <v-layout align-center justify-center>
          <div class="headline font-weight-light">请选择企业</div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    companyListShow: [],
    filted: false,
    selectedStation: [],
    pageProp: ""
  }),
  methods: {
    filter(id) {
      this.filted = true;
      this.selectedStation = this.stationList.find(element => {
        return element.id === id;
      });
      this.companyListShow = [];
      this.companyList.forEach(element => {
        if (element.station == id) {
          this.companyListShow.push(element);
        }
      });
    },
    reFill() {
      this.companyListShow = this.companyList;
      this.filted = false;
    }
  },
  computed: {
    ...mapGetters({
      companyList: "company/companyList",
      stationList: "organization/stationList",
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    this.companyListShow = this.companyList;
    if (this.userInfo.role > 1) {
      this.filter(this.userInfo.station);
    }
  },
  beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style>
</style>
