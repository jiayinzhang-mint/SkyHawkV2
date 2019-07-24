<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black">监管人员</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text rounded @click="newSupervisorDialog=true">
        <v-icon>add</v-icon>&nbsp;新建
      </v-btn>
    </v-toolbar>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex v-for="(item,i) in supervisorList" :key="i" xs4 md3>
          <v-card>
            <v-img contain :src="item.avatar" lazy-src="/static/assets/lazy.jpg">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="primary" :width="1"></v-progress-circular>
              </v-layout>
            </v-img>

            <v-card-actions>
              <div class="subtitle-2">{{item.name}}</div>
              <v-spacer></v-spacer>
              <v-btn x-small icon @click="deleteSupervisor(item.id)">
                <v-icon>clear</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="newSupervisorDialog" width="500">
      <v-card>
        <v-card-title class="subtitle-1" primary-title>监管人员</v-card-title>
        <v-container>
          <v-form ref="supervisorForm">
            <v-select
              v-model="newSupervisor"
              :items="supervisorOptions"
              item-value="id"
              item-text="name"
              label="监管人员"
              required
              :rules="[v => !!v || '请选择人员']"
            ></v-select>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary"
              rounded
              flat
              @click="newSupervisorDialog = false; updateSupervisor()"
            >保存</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import companyService from "../../../service/CompanyService";
import { mapGetters } from "vuex";
import organizationService from "../../../service/OrganizationService";
export default {
  data() {
    return {
      supervisorList: [],
      newSupervisorDialog: false,
      newSupervisor: null,
      supervisorOptions: []
    };
  },
  methods: {
    async getSupervisor() {
      const rsp = await companyService.getCompanySupervisor(
        this.$route.params.companyId
      );
      this.supervisorList = rsp.companySupervisor;
    },
    async getSupervisorOptions() {
      var company = this.companyList.find(e => {
        return e.id == this.$route.params.companyId;
      });
      const rsp = await organizationService.getOrganizationDetail({
        id: company.besupervised
      });
      // check duplication?
      this.supervisorOptions = rsp.userList;
    },
    async updateSupervisor() {
      console.log(this.newSupervisor);
      await companyService.updateCompanySupervisor(
        this.$route.params.companyId,
        this.newSupervisor
      );
      this.getSupervisor();
    },
    async deleteSupervisor(supervisorId) {
      try {
        await this.$confirm("确认删除吗?");
        await companyService.deleteComapnySupervisor(
          this.$route.params.companyId,
          supervisorId
        );
        this.getSupervisor();
      } catch (err) {
        err;
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      companyList: "company/companyList",
      organizationList: "organization/organizationList",
      stationList: "organization/stationList"
    })
  },
  mounted() {
    this.getSupervisor();
    this.getSupervisorOptions();
  }
};
</script>

<style>
</style>
