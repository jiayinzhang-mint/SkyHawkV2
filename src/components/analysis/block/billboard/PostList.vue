<template>
  <div>
    <!-- <v-icon class="mr-4" size="64">alarm</v-icon> -->
    <v-toolbar class="transparent" flat column align-start dense>
      <div class="subtitle-1 font-weight-bold">公告板</div>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense style="max-height:174px;overflow:auto" color="transparent">
      <div v-for="(item,i) in postList" :key="i">
        <v-list-item @click="showPost(item);postDialog=true" ripple>
          <v-list-item-title class="text-uppercase">{{item.title}}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <v-dialog v-model="postDialog" width="500" persistent scrollable>
      <v-card>
        <v-toolbar class="transparent" flat>
          <v-toolbar-title>{{postDetail.type}} - {{postDetail.title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="postDialog=false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <p class="body-1">{{postDetail.detail}}</p>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import billboardService from "../../../../service/BillboardService";

export default {
  data() {
    return {
      postDialog: false,
      postDetail: {}
    };
  },
  methods: {
    async showPost(item) {
      this.postDetail = {};
      const rsp = await billboardService.getPostInfo(item.id);
      this.postDetail = rsp.articleDetail;
    }
  },
  computed: {
    ...mapGetters({
      postList: "billboard/postList"
    })
  },
  mounted() {}
};
</script>

<style>
</style>
