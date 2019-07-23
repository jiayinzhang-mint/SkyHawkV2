<template>
  <div>
    <v-container v-if="alertDetail.title!='温度超上限'">
      <img
        :src="alertDetail.src"
        class="image elevation-12"
        style="max-width: 100%;max-height: 100%;border-radius:3px"
        v-viewer
      >
    </v-container>
    <v-list>
      <v-subheader>告警详情</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">info</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{alertDetail.detail}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">redo</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-if="alertDetail.state == 1">监管部门处理中</v-list-item-title>
          <v-list-item-title v-else-if="alertDetail.state == 2">企业整改中</v-list-item-title>
          <v-list-item-title v-else-if="alertDetail.state == 3">整改审核中</v-list-item-title>
          <v-list-item-title v-else-if="alertDetail.state == 4">已完成</v-list-item-title>
          <v-list-item-title v-else-if="alertDetail.state == 9">告警错误</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>

      <div v-if="alertDetail.title=='温度超上限'">
        <v-list-item>
          <v-list-item-action>
            <v-icon color="primary">whatshot</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="color:#ff5555">{{alertDetail.temperature}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-action>
            <v-icon color="primary">bubble_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="color:#ff5555">{{alertDetail.humidity}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      company: {},
      station: {},
      group: {}
    };
  },
  methods: {
    redirect() {},
    async getCompanyInfo() {
      this.company = this.companyList.find(element => {
        return element.id == this.alertDetail.company;
      });
    },
    async getStationInfo() {
      this.station = this.organizationList[1].children.find(element => {
        return element.id == this.alertDetail.station;
      });
    },
    async getGroupInfo() {
      this.group = this.station.children.find(element => {
        return element.id == this.company.besupervised;
      });
    },
    async getBasicInfo() {
      this.getCompanyInfo();
      this.getStationInfo();
      this.getGroupInfo();
    }
  },
  computed: {
    ...mapGetters({
      alertDetail: "alert/alertDetail",
      companyList: "company/companyList",
      organizationList: "organization/organizationList"
    })
  },
  mounted() {
    this.getBasicInfo();
  }
};
</script>

<style>
</style>
