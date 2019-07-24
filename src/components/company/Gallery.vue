<template>
  <v-layout>
    <v-container fluid grid-list-lg>
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
              <img :data-large="item.src" />
            </div>
            <v-card-actions ref="picture2">
              <span class="subtitle-1">{{item.time| timeFormat}}</span>
              <v-spacer></v-spacer>
              <v-btn small text icon slot="activator" class="mr-2" @click="show">
                <v-icon>search</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout class="mt-2">
        <v-btn block rounded depressed @click="updateGalleryList">加载更多</v-btn>
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
    page: 1,
    galleryList: []
  }),
  methods: {
    async getGalleryList() {
      const rsp = await companyService.getCompanyGallery(
        this.$route.params.companyId,
        this.page
      );
      this.galleryList = rsp.galleryList;
    },
    async updateGalleryList() {
      const rsp = await companyService.getCompanyGallery(
        this.$route.params.companyId,
        this.page
      );
      rsp.galleryList.forEach(e => {
        this.galleryList.push(e);
      });
      this.page += 1;
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

    goToCompany() {
      this.$router.push({ path: "/company/" + this.$route.params.companyId });
    }
  },
  async mounted() {
    await this.getGalleryList();
    this.page = 2;
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      organizationList: "organization/organizationList",
      stationList: "organization/stationList",
      companyList: "company/companyList"
    })
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    await this.getGalleryList();
    this.page = 2;
  }
};
</script>

<style>
</style>
