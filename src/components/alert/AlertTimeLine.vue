<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md10 offset-md2>
        <v-timeline align-top dense>
          <v-timeline-item
            color="pink"
            fill-dot
            small
            v-if="alertDetail.state>=1&&alertDetail.state<=8"
          >
            <v-layout pt-3>
              <v-flex xs5>
                <strong>{{alertDetail.create_time | moment("YYYY-MM-DD HH:mm:ss")}}</strong>
              </v-flex>
              <v-flex>
                <strong>触发告警</strong>
                <div class="caption">交由 监管部门 处理</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item color="pink" fill-dot small v-if="alertDetail.uncertain==1">
            <v-layout wrap pt-3>
              <v-flex xs5>
                <strong>{{alertDetail.uncertain_time | moment("YYYY-MM-DD HH:mm:ss")}}</strong>
              </v-flex>
              <v-flex>
                <strong>转发处理</strong>
                <div class="caption mb-2">交由 食药监 处理</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            color="pink"
            fill-dot
            small
            v-if="alertDetail.state>=2&&alertDetail.state<=8 && alertDetail.auto==1"
          >
            <v-layout wrap pt-3>
              <v-flex xs5>
                <strong>{{alertDetail.repost_time | moment("YYYY-MM-DD HH:mm:ss")}}</strong>
              </v-flex>
              <v-flex>
                <strong>下发整改</strong>
                <div class="caption mb-2">交由 {{station.name}}-{{group.name}} 处理</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            color="pink"
            fill-dot
            small
            v-if="alertDetail.state>=3&&alertDetail.state<=8"
          >
            <v-layout pt-3>
              <v-flex xs5>
                <strong>{{alertDetail.rectify_time | moment("YYYY-MM-DD HH:mm:ss")}}</strong>
              </v-flex>
              <v-flex>
                <strong>企业反馈</strong>
                <div class="caption mb-2">交由 {{station.name}}-{{group.name}} 审核</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            color="pink"
            fill-dot
            small
            v-if="alertDetail.state>=4&&alertDetail.state<=8"
          >
            <v-layout pt-3>
              <v-flex xs5>
                <strong>{{alertDetail.finish_time | moment("YYYY-MM-DD HH:mm:ss")}}</strong>
              </v-flex>
              <v-flex>
                <strong>整改完成</strong>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item color="pink" fill-dot small v-if="alertDetail.state==9">
            <v-layout pt-3>
              <v-flex xs5>
                <strong>{{alertDetail.error_time | moment("YYYY-MM-DD HH:mm:ss")}}</strong>
              </v-flex>
              <v-flex>
                <strong>告警错误</strong>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    getBasicInfo() {
      this.company = this.companyList.find(element => {
        return element.id == this.alertDetail.company;
      });

      this.station = this.organizationList[1].children.find(element => {
        return element.id == this.company.station;
      });

      this.group = this.station.children.find(element => {
        return element.id == this.company.besupervised;
      });
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
