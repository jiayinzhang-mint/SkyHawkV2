<template>
  <div>
    <v-toolbar flat class="transparent">
      <v-toolbar-title>基本信息</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn round flat @click="updateOrganizationDetail">
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

      const rsp = await organizationService.getOrganizationDetail(
        this.$route.params.organizationId
      );
      this.organizationInfo = rsp.organizeInfo;
      this.userList = rsp.userList;

    },
    async updateOrganizationDetail() {}
  },
  computed: {
    ...mapGetters({
      organizationList: "organization/organizationList",
      stationList: "organization/stationList"
    })
  },
  async mounted() {},
  async beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style>
</style>
