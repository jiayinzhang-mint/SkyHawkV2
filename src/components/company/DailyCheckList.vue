<template>
  <div>
    <v-data-table :headers="headers" :items="alertListShow" no-data-text="暂无数据" hide-actions>
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.create_time | timeFormat }}</td>
        <td class="text-xs-center">
          <v-btn flat round color="primary">详情</v-btn>
        </td>
      </template>
    </v-data-table>
    <v-layout>
      <v-container>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
  methods: {},

  computed: {},
  mounted() {}
};
</script>

<style>
</style>
