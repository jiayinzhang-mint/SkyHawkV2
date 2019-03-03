<template>
  <v-container style="height:calc(100vh - 64px);overflow :auto">
    <v-card>
      <v-toolbar flat color="transparent">
        <v-toolbar-title style="font-size:17px">{{organizeInfo.name}}</v-toolbar-title>
      </v-toolbar>
      <v-data-table :headers="headers" :items="userList" hide-actions no-data-text="暂无数据">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.index }}</td>
          <td class="text-xs-center">{{ props.item.phone }}</td>
          <td class="text-xs-center">
            <v-chip v-if="props.item.wechat" small text-color="white" color="green">在线</v-chip>
            <v-chip v-else small text-color="white" color="red darken-3">离线</v-chip>
          </td>
          <td class="text-xs-center">
            <v-btn color="primary" round flat @click="currentUser=props.item;userInfoDialog=true">信息</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="userInfoDialog" max-width="250">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{currentUser.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="userInfoDialog=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-img contain :src="currentUser.avatar" v-if="currentUser.avatar" lazy-src="/img/lazy.jpg">
          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">book</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{currentUser.index}}</v-list-tile-title>
              <v-list-tile-sub-title>工号</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{currentUser.phone}}</v-list-tile-title>
              <v-list-tile-sub-title>移动电话</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import organizationService from "../../service/OrganizationService";
import userService from '../../service/UserService';
export default {
  data: () => ({
    organizeInfo: [],
    userList: [],
    currentUser: [],
    userInfoDialog: false,
    headers: [
      {
        text: "姓名",
        align: "center",
        sortable: false,
        value: "name"
      },
      {
        text: "工号",
        value: "index",
        align: "center",
        sortable: false
      },
      {
        text: "移动电话",
        value: "phone",
        align: "center",
        sortable: false
      },
      {
        text: "微信",
        align: "center",
        sortable: false
      },
      {
        text: "操作",
        align: "center",
        sortable: false
      }
    ]
  }),
  methods: {
    async getOrganizationDetail() {
      const rsp = await organizationService.getOrganizationDetail({
        id: this.$route.params.organizationId
      });
      this.organizeInfo = rsp.organizeInfo;
    },
    showDetail(item) {
      this.userInfoDialog = true;
      this.currentUser = item;
    },
    async getOrganizationUser() {
      const rsp = await userService.getUserList({
        organization: this.$route.params.organizationId
      });
      this.userList = rsp.organizationUser;
    }
  },
  mounted() {
    this.getOrganizationDetail();
    this.getOrganizationUser();
  },
  computed: {
    ...mapGetters({ userInfo: "user/userInfo" })
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getOrganizationDetail();
    this.getOrganizationUser();
  }
};
</script>

