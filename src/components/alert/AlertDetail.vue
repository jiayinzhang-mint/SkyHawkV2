<template>
  <v-container fluid grid-list-lg>
    <v-layout>
      <v-flex xs8>
        <v-card>
          <v-toolbar flat color="transparent">
            <v-tooltip bottom>
              <v-btn icon slot="activator" :to="'/alert'">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <span>返回</span>
            </v-tooltip>

            <v-toolbar-title>{{alertDetail.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="alertDetail.state==1">
              <div v-if="alertDetail.auto==1">
                <div v-if="userInfo.role==1">
                  <v-btn flat round @click.stop="uncertainAlert">
                    <v-icon class="mr-1">flag</v-icon>标记
                  </v-btn>

                  <v-btn flat round @click.stop="errorAlert">
                    <v-icon class="mr-1">delete</v-icon>误报
                  </v-btn>

                  <v-btn flat round @click.stop="repostAlert">
                    <v-icon class="mr-1">redo</v-icon>下发
                  </v-btn>
                </div>
              </div>
            </div>

            <div v-else-if="alertDetail.state==2">
              <v-btn
                depressed
                round
                v-if="userInfo.role==4"
                color="primary"
                @click="rectifyAlert"
              >我已整改</v-btn>
            </div>
            <div v-else-if="alertDetail.state==3">
              <v-btn depressed round color="primary" v-if="userInfo.role==2" @click="finishAlert">完成</v-btn>
            </div>
            <div v-if="userInfo.role==0">
              <v-btn round flat @click="deleteAlert()">
                <v-icon class="mr-1">delete</v-icon>删除
              </v-btn>
            </div>
          </v-toolbar>
          <v-tabs v-model="tab" centered>
            <v-tabs-slider></v-tabs-slider>
            <v-tab key="1">基本信息</v-tab>
            <v-tab key="2">流转历史</v-tab>
          </v-tabs>
          <v-divider></v-divider>
          <v-tabs-items
            class="no-scrollbar"
            v-model="tab"
            style="height:calc(100vh - 210px);overflow :auto"
          >
            <v-tab-item key="1">
              <alert-basic-info ref="alertBasicInfo"></alert-basic-info>
            </v-tab-item>
            <v-tab-item key="2">
              <alert-time-line></alert-time-line>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
      <v-flex xs4 d-flex>
        <v-card>
          <v-toolbar flat class="transparent">
            <v-toolbar-title>{{company.brand}}</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-layout>
              <v-flex xs12>
                <company-score></company-score>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout>
              <v-flex xs12>
                <section-score></section-score>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout>
              <v-flex xs12>
                <v-btn flat block round :to="'/company/'+company.id+'/info'">
                  前往企业信息
                  <v-icon>arrow_right</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import alertBasicInfo from "./AlertBasicInfo";
import alertTimeLine from "./AlertTimeLine";
import companyScore from "../analysis/block/company/CompanyScore";
import sectionScore from "../analysis/chart/company/SectionScore";

import { mapGetters } from "vuex";
import alertService from "../../service/AlertService";
export default {
  components: {
    alertBasicInfo: alertBasicInfo,
    alertTimeLine: alertTimeLine,
    companyScore: companyScore,
    sectionScore: sectionScore
  },
  data: () => ({
    tab: 0,
    company: [],
    station: [],
    group: []
  }),
  methods: {
    redirect() {
      this.$router.push({ path: "/company/" + this.company.id });
    },
    async getCompanyInfo() {
      this.company = this.companyList.find(element => {
        return element.id == this.alertDetail.company;
      });
    },
    async uncertainAlert() {
      try {
        await this.$confirm("确认交由食药监处理?");
        await alertService.uncertainAlert(this.$route.params.alertId);
        this.$router.push({ path: "/alert" });
      } catch (err) {
        return;
      }
    },
    async errorAlert() {
      try {
        await this.$confirm("确认误报?");
        await alertService.errorAlert(this.$route.params.alertId);
        this.$router.push({ path: "/alert" });
      } catch (err) {
        return;
      }
    },
    async repostAlert() {
      try {
        await this.$confirm("确认下发?");
        await alertService.repostAlert(this.$route.params.alertId);
        this.$router.push({ path: "/alert" });
      } catch (err) {
        return;
      }
    },
    async rectifyAlert() {},
    async finishAlert() {
      try {
        await this.$confirm("确认完成?");
        await alertService.finishAlert(this.$route.params.alertId);
        this.$router.push({ path: "/alert" });
      } catch (err) {
        return;
      }
    },
    async deleteAlert() {
      try {
        await this.$confirm("确认删除?");
        await alertService.deleteAlert(this.$route.params.alertId);
        this.$router.push({ path: "/alert" });
      } catch (err) {
        return;
      }
    }
  },
  async mounted() {
    this.$loading.show(true);
    await alertService.getAlertDetail(this.$route.params.alertId);
    await this.$refs.alertBasicInfo.getBasicInfo();
    this.getCompanyInfo();
    this.$loading.show(false);
  },
  computed: {
    ...mapGetters({
      alertDetail: "alert/alertDetail",
      userInfo: "user/userInfo",
      companyList: "company/companyList",
      organizationList: "organiation/organizeList",
      stationList: "organization/stationList"
    })
  },
  async beforeRouteUpdate(to, from, next) {
    this.$loading.show(true);
    next();
    await alertService.getAlertDetail(this.$route.params.alertId);
    await this.$refs.alertBasicInfo.getBasicInfo();
    this.getCompanyInfo();
    this.tab = 0;
    this.$loading.show(false);
  }
};
</script>

<style>
</style>
