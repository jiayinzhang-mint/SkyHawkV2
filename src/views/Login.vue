<template>
  <v-app dark class="no-scrollbar">
    <v-container fluid fill-height style="padding:0 !important">
      <v-scroll-y-transition>
        <v-layout justify-center align-center>
          <v-flex
            class="hidden-md-and-down background"
            style="background-color:#000; height:100%"
            md8
          >
            <v-layout align-center column justify-center fill-height>
              <h1 class="display-3 font-weight-thin mb-2">SkyHawk</h1>
              <div align-center>
                <v-divider></v-divider>
                <v-btn text rounded>用户手册</v-btn>
                <v-btn text rounded>反馈问题</v-btn>
              </div>
            </v-layout>
          </v-flex>
          <v-flex xs12 md4 d-flex>
            <v-container style="padding-right:100px !important">
              <v-card-text>
                <p class="text-md-left headline font-weight-bold mb-4 pt-3">登录 SkyHawk</p>
                <v-form ref="loginForm">
                  <v-text-field
                    v-model="username"
                    prepend-icon="person"
                    name="login"
                    label="用户名"
                    type="text"
                    :rules="[v => !!v || '请填写用户名']"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="密码"
                    type="password"
                    :rules="[v => !!v || '请填写密码']"
                    @keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="pb-5">
                <v-btn outlined light color="primary" depressed @click="login" rounded>登录</v-btn>
              </v-card-actions>
            </v-container>
          </v-flex>
        </v-layout>
      </v-scroll-y-transition>
    </v-container>
  </v-app>
</template>

<script>
import authService from "@/service/AuthService";
import companyService from "@/service/CompanyService";
import organizationService from "@/service/OrganizationService";
import alertService from "@/service/AlertService";
import dashboardShortcut from "@/shortcut/Dashboard";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        const rsp = await authService.login(this.username, this.password);
        if (rsp.msg == "success") {
          organizationService.getOrganizationList({ all: true });
          dashboardShortcut.getInstantData();
          dashboardShortcut.getOrganizationCalculateData(
            1,
            10,
            this.userInfo.station
          );
          await companyService.getCompanyList();
          alertService.getALertList(this.userInfo.station);
          this.$router.push({ path: "/today" });
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  mounted() {}
};
</script>


<style scopped>
.background {
  background-image: url("/img/Back.jpg") !important;
  background-size: auto 100% !important;
}
</style>
