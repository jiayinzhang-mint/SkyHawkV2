<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title>监控点</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text rounded @click="createMonitorDialog=true">
        <v-icon>add</v-icon>&nbsp;新建
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="monitorList" hide-actions no-data-text="暂无数据">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.index }}</td>
        <td class="text-xs-center">{{ props.item.channel }}</td>
        <td class="text-xs-center">
          <v-btn color="primary" icon flat @click="updateMonitorDialog=true;monitorInfo=props.item">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn color="error" icon flat @click="deleteMonitor(props.item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="createMonitorDialog" width="400">
      <v-card>
        <v-card-title class="subtitle-1" primary-title>监控点</v-card-title>
        <v-container>
          <v-form ref="createMonitorForm">
            <v-text-field
              v-model="monitorInfo.name"
              label="名称"
              :rules="[v => !!v || '请填写明晨']"
              required
            ></v-text-field>
            <v-text-field
              v-model="monitorInfo.index"
              label="编号"
              :rules="[v => !!v || '请填写编号']"
              required
            ></v-text-field>
            <v-text-field
              v-model="monitorInfo.channel"
              label="通道"
              :rules="[v => !!v || '请填写通道']"
              required
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary"
              rounded
              flat
              @click="createMonitorDialog = false; createMonitor()"
            >保存</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="updateMonitorDialog" width="400">
      <v-card>
        <v-card-title class="subtitle-1" primary-title>监控点</v-card-title>
        <v-container>
          <v-form ref="updateUserForm">
            <v-text-field
              v-model="monitorInfo.name"
              label="名称"
              :rules="[v => !!v || '请填写名称']"
              required
            ></v-text-field>
            <v-text-field
              v-model="monitorInfo.index"
              label="编号"
              :rules="[v => !!v || '请填写编号']"
              required
            ></v-text-field>
            <v-text-field
              v-model="monitorInfo.channel"
              label="通道"
              :rules="[v => !!v || '请填写通道']"
              required
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary"
              rounded
              flat
              @click="updateMonitorDialog = false; updateMonitor()"
            >保存</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import deviceService from "../../../service/DeviceService";
export default {
  data() {
    return {
      createMonitorDialog: false,
      updateMonitorDialog: false,
      monitorInfo: {},
      monitorList: [],
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
          text: "通道",
          align: "center",
          sortable: false
        },
        {
          text: "操作",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  methods: {
    async getMonitorList() {

      const rsp = await deviceService.getMonitorList({
        company: this.$route.params.companyId
      });
      this.monitorList = rsp.monitorList;

    },
    async createMonitor() {
      if (this.$refs.createMonitorForm.validate()) {
        this.monitorInfo.company = this.$route.params.companyId;
        await deviceService.createMonitor(this.monitorInfo);
        this.getMonitorList();
      }
    },
    async updateMonitor() {
      if (this.$refs.createMonitorForm.validate()) {
        await deviceService.updateMonitor(this.monitorInfo);
        this.getMonitorList();
      }
    },
    async deleteMonitor(monitorId) {
      try {
        await this.$confirm("确认删除?");
        await deviceService.deleteMonitor({
          id: monitorId
        });
        this.getMonitorList();
      } catch (err) {
        err;
      }
    }
  },
  computed: {},
  mounted() {
    this.getMonitorList();
  }
};
</script>

<style>
</style>
