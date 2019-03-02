<template>
  <div>
    <v-toolbar flat class="transparent">
      <v-toolbar-title>基本信息</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn round flat @click="updateCompanyInfo">
        <v-icon>save</v-icon>&nbsp;保存
      </v-btn>
    </v-toolbar>
    <v-form ref="companyInfoForm">
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-text-field v-model="companyInfo.brand" label="店名" required></v-text-field>
            <v-text-field v-model="companyInfo.name" label="企业" required></v-text-field>
            <v-text-field v-model="companyInfo.legal_person" label="法人" required></v-text-field>
            <v-text-field v-model="companyInfo.address" label="地址" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs6>
            <v-text-field v-model="companyInfo.license" label="证照号码" required></v-text-field>
            <v-select
              v-model="companyInfo.station"
              :items="stationList"
              @change="cascadeGroup"
              item-value="id"
              item-text="name"
              label="街道"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              lazy
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="companyInfo.license_validity"
                  label="证照到期时间"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                :first-day-of-week="0"
                locale="zh-cn"
                v-model="companyInfo.license_validity"
                landscape
              ></v-date-picker>
            </v-menu>
            <v-select
              v-model="companyInfo.besupervised"
              :items="groupList"
              item-value="id"
              item-text="name"
              label="监管组"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import companyService from "../../../service/CompanyService";
export default {
  data() {
    return {
      companyInfo: {},
      menu: false,
      groupList: []
    };
  },
  methods: {
    async getCompanyInfo() {
      this.$loading.show(true);
      const rsp = await companyService.getCompanyDetail(
        this.$route.params.companyId
      );
      this.companyInfo = rsp.companyDetail;
      this.station = this.organizationList[1].children.find(element => {
        return element.id === this.companyInfo.station;
      });
      this.group = this.station.children.find(element => {
        return (element.id = this.companyInfo.besupervised);
      });
      this.$loading.show(false);
    },
    async updateCompanyInfo() {
      console.log(this.companyInfo);
      if (this.$refs.companyInfoForm.validate()) {
        await companyService.updateCompany(
          this.$route.params.companyId,
          this.companyInfo
        );
      }
    },
    cascadeGroup() {
      this.groupList = [];
      this.organizationList[1].children.forEach(e => {
        if (e.id == this.companyInfo.station) {
          var station = e;
          this.groupList = station.children;
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      organizationList: "organization/organizationList",
      stationList: "organization/stationList"
    })
  },
  async mounted() {
    await this.getCompanyInfo();
    this.cascadeGroup();
  },
  async beforeRouteUpdate(to, from, next) {
    next();
    await this.getCompanyInfo();
    this.cascadeGroup();
  }
};
</script>

<style>
</style>
