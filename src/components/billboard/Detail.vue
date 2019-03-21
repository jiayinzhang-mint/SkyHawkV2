<template>
  <v-container>
    <v-card>
      <v-toolbar flat class="transparent">
        <v-spacer></v-spacer>
        <v-btn>删除</v-btn>
      </v-toolbar>
      <v-container>
        <v-form ref="postForm">
          <v-text-field
            v-model="postDetail.title"
            label="标题"
            :rules="[v => !!v || '请填写标题']"
            required
          ></v-text-field>
          <v-select
            :items="postType"
            :rules="[v => !!v || '请选择类型']"
            v-model="postDetail.type"
            label="类型"
          ></v-select>
          <v-textarea label="内容" counter="140" v-model="postDetail.detail"></v-textarea>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import billboardService from "../../service/BillboardService";

export default {
  data() {
    return {
      postDetail: {},
      postType: ["信息", "紧急"]
    };
  },
  methods: {
    async getPostDetail() {
      const rsp = await billboardService.getPostInfo(this.$route.params.postId);
      this.postDetail = rsp.articleDetail;
    }
  },
  mounted() {
    this.getPostDetail();
  }
};
</script>

<style>
</style>
