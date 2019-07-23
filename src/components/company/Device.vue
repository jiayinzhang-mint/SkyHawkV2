<template>
  <div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-center">名称</th>
          <th class="text-center">编号</th>
          <th class="text-center">状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in nvrList" :key="`nvr-${i}`">
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.index }}</td>
          <td class="text-center" v-if="item.status == 1">
            <v-chip small text-color="white" color="green">在线</v-chip>
          </td>
          <td class="text-center" v-else>
            <v-chip small text-color="white" color="red darken-3">离线</v-chip>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
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
      const rsp = await companyService.getCompanyDevice(
        this.$route.params.companyId
      );
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
