<template>
  <div>
    <v-data-table :headers="headers" :items="nvrList" hide-actions no-data-text="暂无数据">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.index }}</td>
        <td class="text-xs-center" v-if="props.item.status == 1">
          <v-chip small text-color="white" color="green">在线</v-chip>
        </td>
        <td class="text-xs-center" v-else>
          <v-chip small text-color="white" color="red darken-3">离线</v-chip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import companyService from "../../service/CompanyService";

export default {
  data: () => ({
    loading: true,
    nvrList: [],
    headers: [
      {
        text: "名称",
        align: "center",
        sortable: false
      },
      {
        text: "编号",
        align: "center",
        sortable: false
      },
      {
        text: "状态",
        align: "center",
        sortable: false
      }
    ]
  }),
  methods: {
    async getDeviceList() {

      const rsp = await companyService.getCompanyDevice(this.$route.params.companyId);
      this.nvrList = rsp.nvrList;

    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.getDeviceList();
  }
};
</script>

<style>
</style>
