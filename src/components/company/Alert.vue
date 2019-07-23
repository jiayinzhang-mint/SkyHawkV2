<template>
  <div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-center">标题</th>
          <th class="text-center">触发时间</th>
          <th class="text-center">状态</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in alertListShow" :key="`alert-${i}`">
          <td class="text-center">{{ item.title }}</td>
          <td class="text-center">{{ item.create_time | timeFormat }}</td>
          <td class="text-center" v-if="item.state == 1">监管部门处理中</td>
          <td class="text-center" v-else-if="item.state == 2">企业整改中</td>
          <td class="text-center" v-else-if="item.state == 3">整改审核中</td>
          <td class="text-center" v-else-if="item.state == 4">已完成</td>
          <td class="text-center" v-else-if="item.state == 9">告警错误</td>
          <td class="text-center">
            <v-btn text rounded color="primary" @click="showAlertDetail(props.item.id)">详情</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-layout>
      <v-container>
        <v-btn block depressed rounded @click.native="getMoreAlert">加载更多</v-btn>
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
      console.log(this.alertListShow);
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
