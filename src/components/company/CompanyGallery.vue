<template>
  <v-layout row>
    <v-container fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex xs6 v-for="(item,i) in galleryList" :key="i">
          <v-card>
            <v-img contain :src="item.src" lazy-src="/img/lazy.jpg">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="primary" :width="1"></v-progress-circular>
              </v-layout>
            </v-img>
            <div
              class="hidden viewer-box"
              v-viewer="{url: 'data-large', navbar: false, movable: false}"
              style="display:none"
            >
              <img :data-large="item.src">
            </div>
            <v-card-actions ref="picture2">
              <span>{{item.time | moment("YYYY-MM-DD HH:mm:ss")}}</span>
              <v-spacer></v-spacer>
              <v-btn flat icon slot="activator" class="mr-2" @click="show">
                <v-icon>search</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import companyService from "../../service/CompanyService";
export default {
  data: () => ({
    companyInfo: [],
    loading: true,
    companySupervisor: [],
    station: [],
    group: [],
    rowsPerPageItems: [6],
    pagination: {
      rowsPerPage: 6
    },
    headers: [
      {
        text: "标题",
        align: "center",
        sortable: false,
        value: "username"
      },
      {
        text: "时间",
        align: "center",
        sortable: false,
        value: "name"
      },
      {
        text: "状态",
        value: "phone",
        align: "center",
        sortable: false
      }
    ],
    galleryList: [],
    page: 1,
    alertForm: {},
    rules: {
      title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      detail: [{ required: true, message: "请输入详情", trigger: "blur" }]
    },
    alertDialog: false
  }),
  methods: {
    async getGalleryList() {
      const rsp = await companyService.getCompanyGallery(this.$route.params.id);
      this.galleryList = rsp.galleryList;
    },

    show(e) {
      let event = e || window.event;
      this.$nextTick(() => {
        let target = event.currentTarget || event.target.parentElement,
          parent =
            target.parentElement.parentElement.parentElement.parentElement;
        //console.log(parent);
        // console.log(parent.querySelector(".viewer-box"));
        let viewer = parent.querySelector(".viewer-box").$viewer;
        viewer.show();
      });
    },
    submitAlert(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.alertDialog = false;
          this.$ajax
            .post("/alert/list", {
              token: this.userInfo.token,
              title: this.alertForm.title,
              detail: this.alertForm.detail,
              company: this.companyInfo.id,
              station: this.station.id,
              src: this.alertForm.src
            })
            .then(data => {
              data = data.data;
              if ((data.msg = "success")) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
              }
            });
        }
      });
    },
    goToCompany() {
      this.$router.push({ path: "/company/" + this.$route.params.id });
    }
  },
  mounted() {
    this.getGalleryList();
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      organizationList: "organization/organizationList",
      stationList: "organization/stationList",
      companyList: "company/companyList"
    })
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getGalleryList();
  }
};
</script>

<style>
</style>
