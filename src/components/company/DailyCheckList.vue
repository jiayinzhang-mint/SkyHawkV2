<template>
  <div>
    <v-data-table :headers="headers" :items="checkList" no-data-text="暂无数据" hide-actions>
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.create_time | timeFormat }}</td>
        <td class="text-xs-center">
          <v-btn
            flat
            round
            color="primary"
            @click="checkInfoDialog=true;getCheckInfo(props.item)"
          >详情</v-btn>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="checkInfoDialog" width="400" scrollable>
      <v-card>
        <v-toolbar flat class="transparent">
          <v-toolbar-title>填表人：{{currentCheck.check_person.name}}</v-toolbar-title>
        </v-toolbar>
        <v-container></v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import companyService from "../../service/CompanyService";
import userService from "../../service/UserService";

export default {
  data: () => ({
    checkList: [],
    currentCheck: {
      check_person: {}
    },
    checkInfoDialog: false,
    headers: [
      {
        text: "填写时间",
        align: "center",
        sortable: false,
        value: "name"
      },
      {
        text: "操作",
        align: "center",
        sortable: false
      }
    ]
  }),
  methods: {
    async getCompanyCheck() {
      const rsp = await companyService.getCompanyCheck(
        this.$route.params.companyId
      );
      this.checkList = rsp.companyCheck;
    },
    async getCheckInfo(e) {
      this.currentCheck = e;
      const rsp = await userService.getUserInfo(e.check_person);
      this.currentCheck.check_person = rsp.userInfo;
      console.log(this.currentCheck.all_area);
      this.currentCheck.all_area = JSON.parse(this.currentCheck.all_area);
      this.currentCheck.cooking_area = JSON.parse(
        this.currentCheck.cooking_area
      );
      this.currentCheck.special_area = JSON.parse(
        this.currentCheck.special_area
      );
      console.log(this.currentCheck);
    }
  },

  computed: {},
  mounted() {
    this.getCompanyCheck();
  }
};
</script>

<style>
</style>
