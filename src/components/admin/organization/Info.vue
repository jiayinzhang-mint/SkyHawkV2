<template>
  <div>
    <v-toolbar flat class="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black">基本信息</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn rounded text @click="updateOrganizationDetail">
        <v-icon>save</v-icon>&nbsp;保存
      </v-btn>
    </v-toolbar>
    <v-form ref="organizationDetailForm">
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-text-field v-model="organizationDetail.name" label="名称" required></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import organizationService from "../../../service/OrganizationService";
export default {
  data() {
    return {
      organizationDetail: {}
    };
  },
  methods: {
    async getOrganizationDetail() {
      const rsp = await organizationService.getOrganizationDetail({
        id: this.$route.params.organizationId
      });
      this.organizationDetail = rsp.organizeInfo;
    },
    async updateOrganizationDetail() {
      this.organizationDetail.id = this.$route.params.organizationId;
      await organizationService.updateOrganization(this.organizationDetail);
    }
  },
  computed: {
    ...mapGetters({
      organizationList: "organization/organizationList",
      stationList: "organization/stationList"
    })
  },
  async mounted() {
    this.getOrganizationDetail();
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    this.getOrganizationDetail();
  }
};
</script>

<style>
</style>
