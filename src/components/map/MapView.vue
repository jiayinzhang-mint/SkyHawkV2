<template>
  <div>
    <div class="mapview" id="markermap" style="height:calc(100vh - 64px);overflow :auto;width:100%">
      <v-card
        v-if="userInfo.role==1"
        class="d-inline-block elevation-12 ml-5 mt-5"
        width="300px"
        style="z-index:1"
      >
        <v-toolbar flat>
          <v-btn icon @click="initTool" v-if="select">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title v-html="highlight" v-if="!select" class="subtitle-1">请选择辖区</v-toolbar-title>
          <v-toolbar-title v-html="select" class="subtitle-1" v-else></v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-navigation-drawer
          class="sub-nav"
          floating
          permanent
          stateless
          value="true"
          v-if="!select"
        >
          <v-list dense style="max-height:400px" class="pt-0 pb-0">
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-title>查看全部</v-list-item-title>
              </template>

              <v-list-item v-for="(item,i) in stationList" :key="i" @click="selectStation(item.id)">
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <v-card v-else class="d-inline-block elevation-12 ml-5 mt-5" width="300px" style="z-index:1">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1">请选择企业</v-toolbar-title>
        </v-toolbar>
      </v-card>
      <v-card
        class="elevation-12 ml-5 mt-2"
        width="300px"
        style="z-index:1"
        v-if="select && !selectCompany"
      >
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1" v-html="highlightCompany">请选择企业</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-navigation-drawer
          class="sub-nav"
          floating
          permanent
          stateless
          value="true"
          v-if="!selectCompany"
        >
          <v-list dense style="max-height:400px" class="pt-0 pb-0">
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-title>查看全部</v-list-item-title>
              </template>

              <v-list-item
                v-for="(item,i) in companyListShow"
                :key="i"
                ripple
                @click="glanceCompany(item.id);selectCompany = item.brand"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase" v-html="item.brand"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <v-scroll-y-transition>
        <v-card class="elevation-12 ml-5 mt-2" width="300px" style="z-index:1" v-if="selectCompany">
          <v-toolbar flat>
            <v-toolbar-title class="subtitle-1 font-weight-black" v-html="selectCompany"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="backTool">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list dense>
            <v-list-item>
              <v-list-item-action>
                <v-icon color="primary">assignment_ind</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text-uppercase">{{companyInfo.brand}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon color="primary">location_on</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text-uppercase">{{companyInfo.address}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon color="info">person</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="subtitle-1" v-html="companyInfo.legalperson"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn block color="primary" dark @click="redirect(companyInfo.id)">详细信息</v-btn>
        </v-card>
      </v-scroll-y-transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import organizationService from "../../service/OrganizationService";
import companyService from "../../service/CompanyService";

export default {
  data: () => ({
    bound: "",
    map: null,
    polygon: null,
    companyListShow: [],
    markers: [],
    polygon: [],
    highlight: "请选择辖区",
    select: "",
    boundaryList: [],
    center: "",
    zoom: "",
    highlightCompany: "请选择企业",
    selectCompany: "",
    companyListShow: [],
    companyInfo: [],
    station: []
  }),
  methods: {
    ...mapActions(["getCompanyList", "getOrganizeList"]),
    async getBound() {
      this.companyListShow = [];

      const rsp = await organizationService.getOrganizationBound(
        this.userInfo.station,
        false
      );
      this.map = new AMap.Map("markermap", {
        resizeEnable: true,
        zoom: 40,
        center: [121.476657, 31.252857],
        mapStyle: "amap://styles/393a749e1b6c87ab7352ecede1ba25a7"
      });
      this.polygon = new AMap.Polygon({
        map: this.map,
        path: rsp[0].bound,
        strokeColor: "#000000",
        strokeOpacity: 0.3,
        strokeWeight: 3,
        fillColor: "#fff",
        fillOpacity: 0.2,
        bubble: true
      });
      this.polygon.setMap(this.map);
      this.map.setFitView();

      this.companyList.forEach(element => {
        if (
          element.station == this.userInfo.station ||
          this.userInfo.role == 1
        ) {
          var marker = new AMap.CircleMarker({
            map: this.map,
            center: element.location.split(","),
            radius: 8,
            strokeColor: "white",
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: "#1E88E5",
            fillOpacity: 0.5,
            zIndex: 10,
            cursor: "pointer",
            clickable: true
          });
          marker.on("mouseover", () => {
            marker.setOptions({ fillColor: "white" });
          });
          marker.on("mouseout", () => {
            marker.setOptions({ fillColor: "#1E88E5" });
          });
          marker.on("click", () => {
            this.selectCompany = element.brand;
            marker.setOptions({ fillColor: "white" });
            this.map.setCenter(element.location.split(","));
            this.glanceCompany(element.id);
          });
        }
      });
    },
    async getBoundDis() {
      const rsp = await organizationService.getOrganizationBound(null, true);

      this.map = new AMap.Map("markermap", {
        resizeEnable: true,
        zoom: 40,
        center: [121.476657, 31.252857],
        mapStyle: "amap://styles/393a749e1b6c87ab7352ecede1ba25a7"
      });
      this.boundaryList = rsp;
      rsp.forEach(element => {
        this.polygon[element.id] = new AMap.Polygon({
          map: this.map,
          path: element.bound,
          strokeColor: "#000000",
          strokeOpacity: 0.2,
          strokeWeight: 3,
          fillColor: "#fff",
          fillOpacity: 0.2,
          bubble: true
        });
        this.polygon[element.id].on("click", () => {
          this.selectStation(element.id);
          this.polygon[element.id].setOptions({
            fillOpacity: 0.5
          });
        });
        this.polygon[element.id].on("mouseover", () => {
          this.polygon[element.id].setOptions({
            fillOpacity: 0.5
          });
          if (this.select == "") {
            this.highlight = element.name;
          }
        });
        this.polygon[element.id].on("mouseout", () => {
          this.polygon[element.id].setOptions({
            fillColor: "#fff",
            fillOpacity: 0.2
          });
          if (this.select == "") {
            this.highlight = "请选择辖区";
          }
        });
        this.polygon[element.id].setMap(this.map);
        var text = new AMap.Text({
          map: this.map,
          text: element.name,
          textAlign: "center", // 'left' 'right', 'center',
          verticalAlign: "middle", //middle 、bottom
          position: element.center,
          clickable: false,
          style: {
            color: "white",
            "background-color": "transparent",
            border: "0px",
            "font-size": "11px"
          },
          bubble: true
        });
        this.map.setFitView();
        this.center = this.map.getCenter();
        this.zoom = this.map.getZoom();
      });
    },
    clearMarkers() {
      this.markers.forEach(element => {
        element.setMap(null);
      });
    },
    initTool() {
      this.select = "";
      this.highlight = "请选择辖区";
      this.highlightCompany = "请选择企业";
      this.selectCompany = "";
      this.map.setCenter(this.center);
      this.map.setZoom(this.zoom);
      this.map.setFitView();
      this.clearMarkers();
    },
    backTool() {
      this.selectCompany = "";
      this.highlightCompany = "请选择企业";
    },
    selectStation(id) {
      this.clearMarkers();
      const station = this.boundaryList.find(element => {
        return element.id === id;
      });
      this.select = station.name;
      this.stationId = id;
      this.map.setCenter(station.center);
      this.map.setFitView([this.polygon[id]]);
      this.companyList.forEach(element => {
        if (element.station == id) {
          this.companyListShow.push(element);
          const marker = new AMap.CircleMarker({
            map: this.map,
            center: element.location.split(","),
            radius: 8,
            strokeColor: "white",
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: "#1E88E5",
            fillOpacity: 0.5,
            zIndex: 10,
            cursor: "pointer",
            clickable: true
          });
          this.markers.push(marker);
          marker.on("mouseover", () => {
            if (this.selectCompany == "") {
              this.highlightCompany = element.brand;
            }
            marker.setOptions({ fillColor: "white" });
          });
          marker.on("mouseout", () => {
            if (this.selectCompany == "") {
              this.highlightCompany = "请选择企业";
            }
            marker.setOptions({ fillColor: "#1E88E5" });
          });
          marker.on("click", () => {
            this.selectCompany = element.brand;
            marker.setOptions({ fillColor: "white" });
            this.map.setCenter(element.location.split(","));
            this.glanceCompany(element.id);
          });
        }
      });
    },
    async glanceCompany(id) {
      const rsp = await companyService.getCompanyDetail(id);
      this.companyInfo = rsp.companyDetail;
    },
    redirect(id) {
      this.$router.push({ path: "/company/" + id });
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      companyList: "company/companyList",
      stationList: "organization/stationList"
    })
  },
  mounted() {
    if (this.userInfo.role > 1) {
      this.getBound();
      this.station = this.stationList.find(element => {
        return element.id === this.userInfo.station;
      });
    } else {
      this.getBoundDis();
    }
  }
};
</script>

<style>
</style>
