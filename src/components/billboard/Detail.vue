<template>
  <v-container>
    <v-card>
      <v-toolbar flat class="transparent">
        <v-toolbar-title class="subtitle-1 font-weight-black">公告详情</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn rounded text @click="deletePost">
          <v-icon>delete</v-icon>&nbsp;删除
        </v-btn>
        <v-btn rounded text @click="updatePost">
          <v-icon>save</v-icon>&nbsp;保存
        </v-btn>
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
            dense
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
    },
    async deletePost() {
      try {
        await this.$confirm("确认删除吗?", "本操作无法恢复。");
        await billboardService.deletePost(this.$route.params.postId);
        this.$router.push({ path: "/billboard" });
      } catch (err) {
        err;
      }
    },
    async updatePost() {
      await billboardService.updatePostInfo(this.postDetail);
    }
  },
  mounted() {
    this.getPostDetail();
  }
};
</script>

<style>
</style>
