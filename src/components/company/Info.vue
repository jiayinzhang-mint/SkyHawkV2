<template>
  <div>
    <div id="markermap" style="width: 100%;height: 400px;z-index:1!important;"></div>
    <v-list class="transparent">
      <v-subheader>企业信息</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">assignment_ind</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{companyInfo.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">location_on</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{companyInfo.address}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">person</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{companyInfo.legal_person}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">group</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{station.name}} - {{group.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-subheader>安全等级</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">stars</v-icon>
        </v-list-item-action>
        <v-list-item-content class="text-left">
          <v-icon
            class="text-left"
            v-if="companyInfo.level==3"
            color="green lighten-2"
            style="justify-content:start"
          >sentiment_very_satisfied</v-icon>
          <v-icon
            class="text-left"
            v-else-if="companyInfo.level==2"
            color="yellow lighten-2"
            style="justify-content:start"
          >sentiment_satisfied</v-icon>
          <v-icon
            class="text-left"
            v-else-if="companyInfo.level==1"
            style="justify-content:start"
            color="red lighten-2"
          >sentiment_dissatisfied</v-icon>
        </v-list-item-content>
      </v-list-item>
      <v-subheader>营业执照</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">assignment</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{companyInfo.license}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-subheader>证照到期时间</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="primary">av_timer</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{companyInfo.license_validity| timeFormat}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import companyService from "../../service/CompanyService";

export default {
  data: () => ({
    companyInfo: [],
    station: {},
    group: {}
  }),
  methods: {
    async getCompanyInfo() {
      const rsp = await companyService.getCompanyDetail(
        this.$route.params.companyId
      );
      this.companyInfo = rsp.companyDetail;
      const map = new AMap.Map("markermap", {
        resizeEnable: true,
        zoom: 40,
        center: [121.476657, 31.252857],
        mapStyle: "amap://styles/393a749e1b6c87ab7352ecede1ba25a7"
      });
      const marker = new AMap.CircleMarker({
        map: map,
        center: this.companyInfo.location.split(","),
        radius: 8,
        strokeColor: "white",
        strokeWeight: 2,
        strokeOpacity: 0.8,
        fillColor: "#1E88E5",
        fillOpacity: 0.8,
        zIndex: 10,
        cursor: "pointer",
        clickable: true
      });
      marker.setMap(map);
      map.setFitView();
      this.station = this.organizationList[1].children.find(element => {
        return element.id === this.companyInfo.station;
      });
      this.group = this.station.children.find(element => {
        return (element.id = this.companyInfo.besupervised);
      });
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      organizationList: "organization/organizationList"
    })
  },
  mounted() {
    this.getCompanyInfo();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getCompanyInfo();
  }
};
</script>

<style>
</style>
