<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black">企业用户</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text rounded @click="createUserDialog=true;userInfo=[]">
        <v-icon>add</v-icon>&nbsp;新建
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="userList" hide-default-footer no-data-text="暂无数据">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.username }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.phone }}</td>
        <td class="text-xs-center">
          <v-chip small text-color="white" color="green">在线</v-chip>
        </td>
      </template>
      <template v-slot:item.wechat="{ item }">
        <v-chip v-if="item.wechat" small text-color="white" color="green">在线</v-chip>
        <v-chip v-else small text-color="white" color="red darken-1">离线</v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn color="primary" icon text @click="updateUserDialog=true;userInfo=item">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn color="error" icon text @click="deleteUser(item.id)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="createUserDialog" width="400">
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black" primary-title>新建用户</v-card-title>
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
            <v-text-field v-model="userInfo.phone" label="移动电话"></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary"
              rounded
              depressed
              @click="createUserDialog = false; createUser()"
            >保存</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="updateUserDialog" width="400">
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black" primary-title>更新用户</v-card-title>
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
            <v-text-field v-model="userInfo.phone" label="移动电话"></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary"
              rounded
              depressed
              @click="updateUserDialog = false; updateUser()"
            >保存</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import userService from "../../../service/UserService";
export default {
  data() {
    return {
      createUserDialog: false,
      updateUserDialog: false,
      userInfo: {},
      userList: [],
      headers: [
        {
          text: "用户名",
          align: "center",
          sortable: false,
          value: "username"
        },
        {
          text: "姓名",
          align: "center",
          sortable: false,
          value: "name"
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
          value: "wechat",
          sortable: false
        },
        {
          text: "操作",
          align: "center",
          value: "action",
          sortable: false
        }
      ]
    };
  },
  methods: {
    async createUser() {
      if (this.$refs.createUserForm.validate()) {
        this.userInfo.role = 4;
        this.userInfo.company = this.$route.params.companyId;
        const rsp = await userService.createUser(this.userInfo);
        this.getUserList();
      }
    },
    async getUserList() {
      const rsp = await userService.getUserList({
        company: this.$route.params.companyId
      });
      this.userList = rsp.companyUser;
    },
    async updateUser() {
      if (this.$refs.updateUserForm.validate()) {
        await userService.updateUser(this.userInfo);
        this.getUserList();
      }
    },
    async deleteUser(userId) {
      try {
        await this.$confirm("确认删除？");
        await userService.deleteUser({
          id: userId
        });
        this.getUserList();
      } catch (err) {
        err;
      }
    }
  },
  computed: {},
  mounted() {
    this.getUserList();
  }
};
</script>

<style>
</style>
