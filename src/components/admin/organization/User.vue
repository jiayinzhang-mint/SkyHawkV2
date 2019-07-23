<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{organizationInfo.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat round @click="createUserDialog=true;userInfo=[]">
        <v-icon>add</v-icon>&nbsp;&nbsp;新建
      </v-btn>
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
          <v-btn color="primary" icon flat small @click="updateUserDialog=true;userInfo=props.item">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon flat small @click="uploadPictureDialog=true;userInfo=props.item">
            <v-icon>photo</v-icon>
          </v-btn>
          <v-btn color="error" icon flat small @click="deleteUser(props.item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="createUserDialog" width="400">
      <v-card>
        <v-card-title class="subtitle-1" primary-title>新建用户</v-card-title>
        <v-container>
          <v-form ref="createUserForm">
            <v-text-field
              v-model="userInfo.username"
              label="用户名"
              :rules="[v => !!v || '请填写用户名']"
              required
            ></v-text-field>
            <v-text-field
              v-model="userInfo.name"
              label="真实姓名"
              :rules="[v => !!v || '请填写真实姓名']"
              required
            ></v-text-field>
            <v-text-field
              v-model="userInfo.index"
              label="工号"
              :rules="[v => !!v || '请填写工号']"
              required
            ></v-text-field>
            <v-text-field v-model="userInfo.phone" label="移动电话"></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn color="primary" round flat @click="createUserDialog = false; createUser()">保存</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="updateUserDialog" width="400">
      <v-card>
        <v-card-title class="subtitle-1" primary-title>更新用户</v-card-title>
        <v-container>
          <v-form ref="updateUserForm">
            <v-text-field
              v-model="userInfo.username"
              label="用户名"
              :rules="[v => !!v || '请填写用户名']"
              required
            ></v-text-field>
            <v-text-field
              v-model="userInfo.name"
              label="真实姓名"
              :rules="[v => !!v || '请填写真实姓名']"
              required
            ></v-text-field>
            <v-text-field
              v-model="userInfo.index"
              label="工号"
              :rules="[v => !!v || '请填写工号']"
              required
            ></v-text-field>
            <v-text-field v-model="userInfo.phone" label="移动电话"></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn color="primary" round flat @click="updateUserDialog = false; updateUser()">保存</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="uploadPictureDialog" max-width="250">
      <v-card>
        <v-card-title class="subtitle-1">上传肖像</v-card-title>
        <v-img contain :src="userInfo.avatar" v-if="userInfo.avatar" lazy-src="/img/lazy.jpg">
          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>
        <v-container>
          <dim-upload v-model="file" type="jpg"></dim-upload>
          <small class="text-xs-center">仅支持.jpg</small>
        </v-container>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn round color="primary" flat @click="uploadPicture">上传</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import userService from "../../../service/UserService";
import organizationService from "../../../service/OrganizationService";
export default {
  data: () => ({
    organizationInfo: [],
    userList: [],
    createUserDialog: false,
    updateUserDialog: false,
    uploadPictureDialog: false,
    userInfo: {},
    file: null,
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
      this.organizationInfo = rsp.organizeInfo;
    },
    async getOrganizationUser() {
      const rsp = await userService.getUserList({
        organization: this.$route.params.organizationId
      });
      this.userList = rsp.organizationUser;
    },
    async createUser() {
      if (this.$refs.createUserForm.validate()) {
        this.userInfo.role = this.organizationInfo.level;
        this.userInfo.organization = this.$route.params.organizationId;
        const rsp = await userService.createUser(this.userInfo);
        this.getOrganizationUser();
      }
    },
    async updateUser() {
      if (this.$refs.updateUserForm.validate()) {
        await userService.updateUser(this.userInfo);
        this.getOrganizationUser();
      }
    },
    async deleteUser(userId) {
      try {
        await this.$confirm("确认删除？");
        await userService.deleteUser({
          id: userId
        });
        this.getOrganizationUser();
      } catch (err) {
        err;
      }
    },
    async uploadPicture() {
      let fileForm = new FormData();
      fileForm.append("name", this.file.name);
      fileForm.append("organizationId", this.$route.params.organizationId);
      fileForm.append("userId", this.userInfo.id);
      fileForm.append("file", this.file);
      await organizationService.uploadPicture(fileForm);
      this.file = null;
      this.uploadPictureDialog = false;
    }
  },
  mounted() {
    this.getOrganizationDetail();
    this.getOrganizationUser();
  },
  computed: {},
  beforeRouteUpdate(to, from, next) {
    next();
    this.getOrganizationDetail();
    this.getOrganizationUser();
  }
};
</script>

