<template>
  <div>
    <v-data-table :headers="headers" :items="alertListShow" no-data-text="暂无数据" hide-actions>
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.create_time | timeFormat }}</td>
        <td class="text-xs-center" v-if="props.item.state == 1">监管部门处理中</td>
        <td class="text-xs-center" v-else-if="props.item.state == 2">企业整改中</td>
        <td class="text-xs-center" v-else-if="props.item.state == 3">整改审核中</td>
        <td class="text-xs-center" v-else-if="props.item.state == 4">已完成</td>
        <td class="text-xs-center" v-else-if="props.item.state == 9">告警错误</td>
        <td class="text-xs-center">
          <v-btn flat round color="primary" @click="showAlertDetail(props.item.id)">详情</v-btn>
        </td>
      </template>
    </v-data-table>
    <v-layout>
      <v-container>
        <v-btn block depressed round @click.native="getMoreAlert">加载更多</v-btn>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import alertService from "../../service/AlertService";

export default {
  data: () => ({
    alertListShow: [],
    headers: [
      {
        text: "标题",
        align: "center",
        sortable: false,
        value: "username"
      },
      {
        text: "触发时间",
        align: "center",
        sortable: false,
        value: "name"
      },
      {
        text: "状态",
        value: "phone",
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
    getAlertList() {
      this.alertListShow = [];
      this.alertList.forEach(element => {
        if (element.company == this.$route.params.companyId) {
          this.alertListShow.push(element);
        }
      });
    },
    showAlertDetail(companyId) {
      this.$router.push({ path: "/alert/" + companyId });
    },
    async getMoreAlert() {
      await alertService.updateAlertList();
      this.getAlertList();
    }
  },

  computed: {
    ...mapGetters({ alertList: "alert/alertList" })
  },
  mounted() {
    this.getAlertList();
  }
};
</script>

<style>
</style>
